import { ModalService } from "./modal.service";
import {
	AfterViewInit,
	Component,
	EventEmitter,
	HostListener,
	Input,
	Output,
	ElementRef,
	ViewChild,
	SimpleChanges,
	OnChanges
} from "@angular/core";
import { cycleTabs, getFocusElementList } from "carbon-components-angular/common";

/**
 * Component to create modals for presenting content.
 *
 * [See demo](../../?path=/story/modal--basic)
 *
 * Using a modal in your application requires `ibm-placeholder` which would generally be
 * placed near the end of your app component template (app.component.ts or app.component.html) as:
 *
```html
<ibm-placeholder></ibm-placeholder>
```
 *
 * A more complete example for `Modal` is given as follows:
 *
 * Example modal definition:
 *
```typescript
@Component({
	selector: "app-sample-modal",
	template: `
				<ibm-modal size="xl" (overlaySelected)="closeModal()">
					<ibm-modal-header (closeSelect)="closeModal()">Header text</ibm-modal-header>
						<section class="modal-body">
							<h1>Sample modal works.</h1>
							<button class="btn--icon-link" nPopover="Hello there" title="Popover title" placement="right" appendInline="true">
								<svg ibmIcon="info" size="sm"></svg>
							</button>
							{{modalText}}
						</section>
					<ibm-modal-footer><button ibmButton="primary" (click)="closeModal()">Close</button></ibm-modal-footer>
				</ibm-modal>`,
	styleUrls: ["./sample-modal.component.scss"]
})
export class SampleModal extends BaseModal {
	modalText: string;
	constructor(protected injector: Injector) {
		super();
		this.modalText = this.injector.get("modalText");
	}
}
```
 *
 * Example of opening the modal:
 *
```typescript
@Component({
	selector: "app-modal-demo",
	template: `
				<button ibmButton="primary" (click)="openModal('drill')">Drill-down modal</button>
				<ibm-placeholder></ibm-placeholder>`
})
export class ModalDemo {
	openModal() {
		this.modalService.create({component: SampleModal, inputs: {modalText: "Hello universe."}});
	}
}
```
 *
 * <example-url>../../iframe.html?id=modal--basic</example-url>
 */
@Component({
	selector: "ibm-modal",
	template: `
		<ibm-overlay
			[theme]="theme"
			[open]="open"
			(overlaySelect)="overlaySelected.emit()">
			<div
				class="bx--modal-container"
				[ngClass]="{
					'bx--modal-container--xs': size === 'xs',
					'bx--modal-container--sm': size === 'sm',
					'bx--modal-container--lg': size === 'lg'
				}"
				role="dialog"
				aria-modal="true"
				style="z-index:1;"
				[attr.aria-label]="ariaLabel"
				#modal>
				<ng-content></ng-content>
				<div
					*ngIf="hasScrollingContent !== null ? hasScrollingContent : shouldShowScrollbar"
					class="bx--modal-content--overflow-indicator">
				</div>
			</div>
		</ibm-overlay>
	`
})
export class Modal implements AfterViewInit, OnChanges {
	/**
	 * Size of the modal to display.
	 */
	@Input() size: "xs" | "sm" | "lg";
	/**
	 * Classification of the modal.
	 */
	@Input() theme: "default" | "danger" = "default";

	/**
	 * Label for the modal.
	 *
	 * @deprecated since v4
	 */
	@Input() set modalLabel(value: string) {
		this.ariaLabel = value;
	}

	get modalLabel() {
		return this.ariaLabel;
	}

	@Input() ariaLabel = "default";

	/**
	 * Controls the visibility of the modal when used directly in a template
	 */
	@Input() open = false;

	/**
	 * The element that triggers the modal, which should receive focus when the modal closes
	 */
	@Input() trigger: HTMLElement;

	/**
	 * Specify whether the modal contains scrolling content. This property overrides the automatic
	 * detection of the existence of scrolling content. Set this property to `true` to force
	 * overflow indicator to show up or to `false` to force overflow indicator to disappear.
	 * It is set to `null` by default which indicates not to override automatic detection.
	 */
	@Input() hasScrollingContent: boolean = null;

	/**
	 * Emits event when click occurs within `n-overlay` element. This is to track click events occurring outside bounds of the `Modal` object.
	 */
	@Output() overlaySelected = new EventEmitter();
	/**
	 * To emit the closing event of the modal window.
	 */
	@Output() close = new EventEmitter();
	/**
	 * Maintains a reference to the view DOM element of the `Modal`.
	 */
	// @ts-ignore
	@ViewChild("modal", { static: true }) modal: ElementRef;

	/**
	 * An element should have 'modal-primary-focus' as an attribute to receive initial focus within the `Modal` component.
	 */
	selectorPrimaryFocus = "[modal-primary-focus]";

	/**
	 * Creates an instance of `Modal`.
	 */
	constructor(public modalService: ModalService) {}

	ngOnChanges({ open }: SimpleChanges) {
		if (open) {
			if (open.currentValue) {
				// `100` is just enough time to allow the modal
				// to become visible, so that we can set focus
				setTimeout(() => this.focusInitialElement(), 100);
			} else if (this.trigger) {
				this.trigger.focus();
			}
		}
	}

	/**
	 * Set document focus to be on the modal component after it is initialized.
	 */
	ngAfterViewInit() {
		this.focusInitialElement();
	}

	/**
	 * Handle keyboard events to close modal and tab through the content within the modal.
	 */
	@HostListener("keydown", ["$event"])
	handleKeyboardEvent(event: KeyboardEvent) {
		switch (event.key) {
			case "Escape": {
				event.stopImmediatePropagation();  // prevents events being fired for multiple modals if more than 2 open
				this.modalService.destroy();  // destroy top (latest) modal
				this.close.emit();
				break;
			}

			case "Tab": {
				cycleTabs(event, this.modal.nativeElement);
				break;
			}
		}
	}

	/**
	 * This detects whether or not the modal contains scrolling content.
	 *
	 * To force trigger a detection (ie. on window resize), change or reset the value of the modal content.
	 *
	 * Use the `hasScrollingContent` input to manually override the overflow indicator.
	 */
	get shouldShowScrollbar() {
		const modalContent = this.modal ? this.modal.nativeElement.querySelector(".bx--modal-content") : null;
		if (modalContent) {
			// get rounded value from height to match integer returned from scrollHeight
			const modalContentHeight = Math.round(modalContent.getBoundingClientRect().height);
			const modalContentScrollHeight = modalContent.scrollHeight;
			return modalContentScrollHeight > modalContentHeight;
		} else {
			return false;
		}
	}

	protected focusInitialElement() {
		const primaryFocusElement = this.modal.nativeElement.querySelector(this.selectorPrimaryFocus);
		if (primaryFocusElement && primaryFocusElement.focus) {
			setTimeout(() => primaryFocusElement.focus());
		} else if (getFocusElementList(this.modal.nativeElement).length > 0) {
			setTimeout(() => getFocusElementList(this.modal.nativeElement)[0].focus());
		} else {
			setTimeout(() => this.modal.nativeElement.focus());
		}
	}
}
