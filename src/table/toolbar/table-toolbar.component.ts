import { TableModel } from "../table-model.class";
import {
	Component,
	EventEmitter,
	Input,
	Output
} from "@angular/core";
import { I18n, Overridable } from "carbon-components-angular/i18n";
import { TableRowSize } from "../table.types";

/**
 * The table toolbar is reserved for global table actions such as table settings, complex filter, export, or editing table data.
 *
 * ## Basic usage
 *
 * ```html
 * <ibm-table-toolbar [model]="model">
 *		<ibm-table-toolbar-actions>
 *			<button ibmButton="primary">
 *				Delete
 *				<svg ibmIcon="delete" size="16" class="bx--btn__icon"></svg>
 *			</button>
 *			<button ibmButton="primary">
 *				Save
 *				<svg ibmIcon="save" size="16" class="bx--btn__icon"></svg>
 *			</button>
 *			<button ibmButton="primary">
 *				Download
 *				<svg ibmIcon="download" size="16" class="bx--btn__icon"></svg>
 *			</button>
 *		</ibm-table-toolbar-actions>
 *			<ibm-table-toolbar-content>
 *			<ibm-table-toolbar-search [expandable]="true"></ibm-table-toolbar-search>
 *			<button ibmButton="toolbar-action">
 *				<svg ibmIcon="settings" size="16" class="bx--toolbar-action__icon"></svg>
 *			</button>
 *			<button ibmButton="primary" size="sm">
 *				Primary Button
 *				<svg ibmIcon="add" size="20" class="bx--btn__icon"></svg>
 *			</button>
 *		</ibm-table-toolbar-content>
 *	</ibm-table-toolbar>
 * ```
 *
 */
@Component({
	selector: "ibm-table-toolbar",
	template: `
	<section
		class="bx--table-toolbar"
		[ngClass]="{'bx--table-toolbar--small' : size === 'sm'}">
		<div
			*ngIf="model"
			class="bx--batch-actions"
			[ngClass]="{
				'bx--batch-actions--active': selected
			}"
			[attr.aria-label]="actionBarLabel.subject | async">
			<div class="bx--action-list">
				<ng-content select="ibm-table-toolbar-actions"></ng-content>
				<button
					ibmButton="primary"
					class="bx--batch-summary__cancel"
					[tabindex]="selected ? 0 : -1"
					(click)="onCancel()">
					{{_cancelText.subject | async}}
				</button>
			</div>
			<div class="bx--batch-summary">
				<p class="bx--batch-summary__para" *ngIf="count as n">
					<ng-container *ngIf="_batchTextLegacy.subject | async as legacyText; else batchTextBlock">
						<span>{{n}}</span> {{legacyText}}
					</ng-container>
					<ng-template #batchTextBlock>
						<span *ngIf="n === 1">{{_batchTextSingle.subject | async}}</span>
						<span *ngIf="n !== 1">{{_batchTextMultiple.subject | i18nReplace: {count: n} | async}}</span>
					</ng-template>
				</p>
			</div>
		</div>
		<ng-content></ng-content>
	</section>
	`
})
export class TableToolbar {
	@Input() model: TableModel;

	@Input() set batchText (value: string | { SINGLE: string, MULTIPLE: string }) {
		if (typeof value === "object") {
			this._batchTextSingle.override(value.SINGLE);
			this._batchTextMultiple.override(value.MULTIPLE);
		} else {
			// For compatibility with old code
			this._batchTextLegacy.override(value);
		}
	}
	@Input() set ariaLabel (value: { ACTION_BAR: string }) {
		this.actionBarLabel.override(value.ACTION_BAR);
	}
	@Input() set cancelText(value: { CANCEL: string }) {
		this._cancelText.override(value.CANCEL);
	}
	@Input() size: TableRowSize = "md";

	get cancelText(): { CANCEL: string } {
		return { CANCEL: this._cancelText.value as string };
	}

	@Output() cancel = new EventEmitter();

	actionBarLabel: Overridable = this.i18n.getOverridable("TABLE_TOOLBAR.ACTION_BAR");
	_cancelText: Overridable = this.i18n.getOverridable("TABLE_TOOLBAR.CANCEL");
	_batchTextLegacy: Overridable = this.i18n.getOverridable("TABLE_TOOLBAR.BATCH_TEXT");
	_batchTextSingle: Overridable = this.i18n.getOverridable("TABLE_TOOLBAR.BATCH_TEXT_SINGLE");
	_batchTextMultiple: Overridable = this.i18n.getOverridable("TABLE_TOOLBAR.BATCH_TEXT_MULTIPLE");

	constructor(protected i18n: I18n) {}

	get count() {
		return this.model.totalDataLength > 0 ? this.model.rowsSelected.reduce((previous, current) => previous + (current ? 1 : 0), 0) : 0;
	}
	get selected() {
		return this.model.totalDataLength > 0 ? this.model.rowsSelected.some(item => item) : false;
	}

	onCancel() {
		this.model.selectAll(false);
		this.cancel.emit();
	}
}
