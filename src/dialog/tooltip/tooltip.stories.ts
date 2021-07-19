import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, select } from "@storybook/addon-knobs/angular";

import { DialogModule } from "../dialog.module";
import { TagModule } from "../../tag/tag.module";
import { IconModule } from "../../icon/icon.module";
import { PlaceholderModule } from "../../placeholder/index";
import { DocumentationModule } from "../../documentation-component/documentation.module";
import { boolean, object } from "@storybook/addon-knobs";

storiesOf("Components|Tooltip", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				IconModule,
				DialogModule,
				PlaceholderModule,
				TagModule,
				DocumentationModule
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<div>
				<ng-template #template let-tooltip="tooltip">
					<p>This is some tooltip text. This box shows the maximum amount of text that should appear inside.
						If more room is needed please use a modal instead.</p>
					<div class="bx--tooltip__footer">
						<a href="/" class="bx--link">Learn More</a>
						<button class="bx--btn bx--btn--primary" (click)="tooltip.doClose()">Close</button>
					</div>
				</ng-template>

				<div class="bx--tooltip__label">
					{{triggerText}}
					<span
						[ibmTooltip]="template"
						[offset]="offset"
						trigger="click"
						[placement]="placement">
						<div role="button">
							<svg ibmIcon="information--filled" size="16"></svg>
						</div>
					</span>
				</div>
				<ibm-placeholder></ibm-placeholder>
			</div>
		`,
		props: {
			placement: select("Tooltip direction", ["bottom", "top", "left", "right"], "bottom"),
			triggerText: text("Trigger text", "Tooltip label"),
			offset: object("Horizontal and vertical offset", { x: 0, y: 0 })
		}
	}))
	.add("No icon", () => ({
		template: `
				<div>
					<ng-template #template let-tooltip="tooltip">
						<p>This is some tooltip text. This box shows the maximum amount of text that should appear inside.
							If more room is needed please use a modal instead.</p>
						<div class="bx--tooltip__footer">
							<a href="/" class="bx--link">Learn More</a>
							<button class="bx--btn bx--btn--primary" (click)="tooltip.doClose()">Close</button>
						</div>
					</ng-template>

					<span
						[ibmTooltip]="template"
						[offset]="offset"
						trigger="click"
						[placement]="placement">
						{{triggerText}}
					</span>
					<ibm-placeholder></ibm-placeholder>
				</div>
			`,
			props: {
				placement: select("Tooltip direction", ["bottom", "top", "left", "right"], "bottom"),
				triggerText: text("Trigger text", "Tooltip label"),
				offset: object("Horizontal and vertical offset", { x: 0, y: 0 })
			}
	}))
	.add("Only icon", () => ({
		template: `
				<div>
					<ng-template #template let-tooltip="tooltip">
						<p>This is some tooltip text. This box shows the maximum amount of text that should appear inside.
							If more room is needed please use a modal instead.</p>
						<div class="bx--tooltip__footer">
							<a href="/" class="bx--link">Learn More</a>
							<button class="bx--btn bx--btn--primary" (click)="tooltip.doClose()">Close</button>
						</div>
					</ng-template>

					<span
						[ibmTooltip]="template"
						[offset]="offset"
						trigger="click"
						[placement]="placement">
						<div role="button" class="bx--tooltip__trigger">
							<svg focusable="false" aria-label="tooltip" width="16" height="16" viewBox="0 0 16 16" role="img" style="will-change: transform;">
								<circle cx="8" cy="3" r="1"></circle><circle cx="8" cy="8" r="1"></circle><circle cx="8" cy="13" r="1"></circle>
							</svg>
						</div>
					</span>
					<ibm-placeholder></ibm-placeholder>
				</div>
			`,
			props: {
				placement: select("Tooltip direction", ["bottom", "top", "left", "right"], "bottom"),
				offset: object("Horizontal and vertical offset", { x: 0, y: 0 })
			}
	}))
	.add("Multiple tooltips", () => ({
		template: `
			<div style="display: flex">
				<div style="margin-right:30px">
					<ng-template #template let-tooltip="tooltip">
						<p>This is some tooltip text. This box shows the maximum amount of text that should appear inside.
							If more room is needed please use a modal instead.</p>
						<div class="bx--tooltip__footer">
						</div>
					</ng-template>
					<span
						[ibmTooltip]="template"
						[offset]="offset"
						trigger="hover"
						[placement]="placement">
						{{triggerText}}
					</span>
					<ibm-placeholder></ibm-placeholder>
				</div>
				<div>
					<ng-template #template2 let-tooltip="tooltip">
						<p>This is some tooltip text. This box shows the maximum amount of text that should appear inside.
							If more room is needed please use a modal instead.</p>
						<div class="bx--tooltip__footer">
						</div>
					</ng-template>
					<span
						[ibmTooltip]="template2"
						trigger="hover"
						[placement]="placement">
						{{triggerText}}
					</span>
					<ibm-placeholder></ibm-placeholder>
				</div>
			</div>
			`,
			props: {
				placement: select("Tooltip direction", ["bottom", "top", "left", "right"], "bottom"),
				triggerText: text("Trigger text", "Tooltip label"),
				offset: object("Horizontal and vertical offset", { x: 0, y: 0 })
			}
	}))
	.add("Programmatically", () => ({
		template: `
			<div>
				<div class="bx--tooltip__label">
					{{triggerText}}
					<span
						ibmTooltip="Hello, World"
						[offset]="offset"
						[isOpen]="isOpen"
						trigger="click"
						[placement]="placement">
						<div role="button">
							<svg ibmIcon="information--filled" size="16"></svg>
						</div>
					</span>
				</div>
				<ibm-placeholder></ibm-placeholder>
			</div>
		`,
		props: {
			placement: select("Tooltip direction", ["bottom", "top", "left", "right"], "bottom"),
			triggerText: text("Trigger text", "Tooltip label"),
			isOpen: boolean("isOpen", false),
			offset: object("Horizontal and vertical offset", { x: 0, y: 0 })
		}
	}))
	.add("Ellipsis tooltip", () => ({
		styles: [`
			.fullText {
				white-space: nowrap;
				display: inline-block;
			}
			.overflowText {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				width: 100px;
				display: inline-block;
			}
		`],
		template: `
			<span
				class="ellipsis"
				[ngClass]="{
					'fullText': showFullText,
					'overflowText': !showFullText
				}"
				trigger="hover"
				[placement]="'bottom'"
				ibmEllipsisTooltip>
					Tooltip for ellipsis because I can and I am really really long
			</span>
			<ibm-placeholder></ibm-placeholder>
		`,
		props: {
			showFullText: boolean("Show full text", false)
		}
	}))
	.add("With dynamic content", () => ({
		template: `
			<div>
				<ng-template #template let-tooltip="tooltip">
					<ibm-tag-filter
						*ngFor="let tag of tags; let i of index"
						(close)="removeTag(i)">
						{{ tag.content }}
					</ibm-tag-filter>
				</ng-template>
				<div class="bx--tooltip__label">
					{{triggerText}}
					<span
						[ibmTooltip]="template"
						trigger="click"
						[placement]="placement">
						<div role="button">
							<svg ibmIcon="information--filled" size="16"></svg>
						</div>
					</span>
				</div>
				<ibm-placeholder></ibm-placeholder>
			</div>
		`,
		props: {
			placement: select("Tooltip direction", ["bottom", "top", "left", "right"], "bottom"),
			triggerText: text("Trigger text", "Tooltip label"),
			tags: [{ content: "One" }, { content: "Two" }, { content: "Three" }, { content: "Four" }],
			removeTag: function(index: number) {
				this.tags.splice(index, 1);
			}
		}
	}))
	.add("Documentation", () => ({
		template: `
			<ibm-documentation src="documentation/classes/src_dialog_tooltip.tooltip.html"></ibm-documentation>
		`
	}));
