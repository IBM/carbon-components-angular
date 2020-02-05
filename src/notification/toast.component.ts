import {
	Component,
	Input,
	OnInit,
	HostBinding
} from "@angular/core";

import { ToastContent } from "./notification-content.interface";
import { Notification } from "./notification.component";
import { ExperimentalService } from "./../experimental.module";
import { NotificationDisplayService } from "./notification-display.service";
import { I18n } from "./../i18n/i18n.module";

/**
 * Toast messages are displayed toward the top of the UI and do not interrupt user’s work.
 *
 * [See demo](../../?path=/story/notification--toast)
 *
 * <example-url>../../iframe.html?id=notification--toast</example-url>
 */
@Component({
	selector: "ibm-toast",
	template: `
		<ibm-icon-error-filled16
			*ngIf="notificationObj.type === 'error'"
			class="bx--toast-notification__icon">
		</ibm-icon-error-filled16>
		<ibm-icon-warning-filled16
			*ngIf="notificationObj.type === 'warning'"
			class="bx--toast-notification__icon">
		</ibm-icon-warning-filled16>
		<ibm-icon-checkmark-filled16
			*ngIf="notificationObj.type === 'success'"
			class="bx--toast-notification__icon">
		</ibm-icon-checkmark-filled16>
		<div class="bx--toast-notification__details">
			<h3 ibmToastTitle [innerHTML]="notificationObj.title"></h3>
			<p ibmToastSubtitle [innerHTML]="notificationObj.subtitle"></p>
			<p ibmToastCaption [innerHTML]="notificationObj.caption"></p>
			<ng-container *ngTemplateOutlet="notificationObj.template"></ng-container>
		</div>
		<button
			*ngIf="showClose"
			class="bx--toast-notification__close-button"
			type="button"
			[attr.aria-label]="notificationObj.closeLabel"
			(click)="onClose()">
			<ibm-icon-close16 class="bx--toast-notification__close-icon"></ibm-icon-close16>
		</button>
	`
})
export class Toast extends Notification implements OnInit {
	private static toastCount = 0;
	/**
	 * Can have `type`, `title`, `subtitle`, and `caption` members.
	 *
	 * `type` can be one of `"error"`, `"info"`, `"warning"`, or `"success"`
	 */
	@Input() notificationObj: ToastContent;
	@Input() showClose: true | false = true;

	@HostBinding("attr.id") toastID = `toast-${Toast.toastCount++}`;
	@HostBinding("class.bx--toast-notification") toastClass = true;
	@HostBinding("attr.role") role = "alert";

	@HostBinding("class.bx--toast-notification--error") get isError() { return this.notificationObj["type"] === "error"; }
	@HostBinding("class.bx--toast-notification--info") get isInfo() { return this.notificationObj["type"] === "info"; }
	@HostBinding("class.bx--toast-notification--success") get isSuccess() { return this.notificationObj["type"] === "success"; }
	@HostBinding("class.bx--toast-notification--warning") get isWarning() { return this.notificationObj["type"] === "warning"; }
	@HostBinding("class.bx--toast-notification--low-contrast") get isLowContrast() { return this.notificationObj.lowContrast; }


	get isExperimental() {
		return this.experimental.isExperimental;
	}

	constructor(
		protected notificationDisplayService: NotificationDisplayService,
		protected i18n: I18n,
		protected experimental: ExperimentalService) {
		super(notificationDisplayService, i18n);
		// disable inline notification styles
		this.notificationClass = false;
	}

	ngOnInit() {
		if (!this.notificationObj.closeLabel) {
			this.notificationObj.closeLabel = this.i18n.get().NOTIFICATION.CLOSE_BUTTON;
		}
	}
}
