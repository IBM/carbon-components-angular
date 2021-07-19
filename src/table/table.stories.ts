import { PaginationModule } from "./../pagination/index";
import { storiesOf, moduleMetadata } from "@storybook/angular";
import {
	withKnobs,
	boolean,
	select,
	number,
	object,
	text
} from "@storybook/addon-knobs/angular";

import {
	Table,
	TableModule,
	TableModel,
	TableItem,
	TableHeaderItem
} from "./index";

import { NFormsModule, ButtonModule } from "../forms/index";
import { DialogModule } from "../dialog/index";
import { SearchModule } from "../search/index";


import {
	TableStory,
	DynamicTableStory,
	ExpansionTableStory,
	FilterByFunctionOverrideStory,
	FilterWithModelStory,
	OverflowTableStory,
	PaginationTableStory,
	SkeletonTableStory,
	TableNoDataStory
} from "./stories";
import { TableRow } from "./table-row.class";
import { DocumentationModule } from "../documentation-component/documentation.module";

const simpleModel = new TableModel();
simpleModel.data = [
	[new TableItem({data: "Name 1"}), new TableItem({data: "qwer"})],
	[new TableItem({data: "Name 3"}), new TableItem({data: "zwer"})],
	[new TableItem({data: "Name 2"}), new TableItem({data: "swer"})],
	[new TableItem({data: "Name 4"}), new TableItem({data: "twer"})]
];
simpleModel.header = [
	new TableHeaderItem({data: "Name"}), new TableHeaderItem({data: "hwer" })
];

const emptyModel = new TableModel();
emptyModel.header = [
	new TableHeaderItem({data: "Name"}), new TableHeaderItem({data: "hwer", style: {"width": "auto"} })
];

const getProps = (more = {}) => {
	return Object.assign({}, {
		model: simpleModel,
		size: select("size", { Small: "sm", Short: "sh", Normal: "md", Large: "lg" }, "md"),
		title: text("Title", "Table title"),
		description: text("Description", ""),
		showSelectionColumn: boolean("showSelectionColumn", true),
		striped: boolean("striped", false),
		sortable: boolean("sortable", true),
		isDataGrid: boolean("Data grid keyboard interactions", true),
		stickyHeader: boolean("stickyHeader", false),
		skeleton: boolean("skeleton", false)
	}, more);
};

function getModelWithDisabledRows() {
	const disabledModel = new TableModel();
	const row1 = new TableRow(new TableItem({data: "Name 1"}), new TableItem({data: "Disabled 1"}));
	row1.disabled = true;
	const row2 = new TableRow(new TableItem({data: "Name 3"}), new TableItem({data: "Disabled 2"}));
	row2.disabled = true;
	const row3 = new TableRow(new TableItem({data: "Name 2"}), new TableItem({data: "Enabled 1"}));
	const row4 = new TableRow(new TableItem({data: "Name 4"}), new TableItem({data: "Enabled 2"}));
	disabledModel.data = [row1, row2, row3, row4];
	return disabledModel;
}

storiesOf("Components|Table", module).addDecorator(
		moduleMetadata({
			imports: [
				NFormsModule,
				TableModule,
				DialogModule,
				PaginationModule,
				SearchModule,
				ButtonModule,
				DocumentationModule
			],
			declarations: [
				TableStory,
				DynamicTableStory,
				ExpansionTableStory,
				FilterByFunctionOverrideStory,
				FilterWithModelStory,
				OverflowTableStory,
				PaginationTableStory,
				SkeletonTableStory,
				TableNoDataStory
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
		<ibm-table-container>
			<ibm-table-header>
				<h4 ibmTableHeaderTitle>{{title}}</h4>
				<p ibmTableHeaderDescription>{{description}}</p>
			</ibm-table-header>
			<!--
				app-* components are for demo purposes only.
				You can create your own implementation by using the component source as an example.
			-->
			<app-table
				[model]="model"
				[stickyHeader]="stickyHeader"
				[size]="size"
				[skeleton]="skeleton"
				[enableSingleSelect]="enableSingleSelect"
				[showSelectionColumn]="showSelectionColumn"
				[striped]="striped"
				[sortable]="sortable"
				[isDataGrid]="isDataGrid">
			</app-table>
		</ibm-table-container>
	`,
		props: getProps({
			enableSingleSelect: boolean("Enable single select", false)
		})
	}))
	.add("With no data", () => ({
		template: `
		<ibm-table-container>
			<ibm-table-header>
				<h4 ibmTableHeaderTitle>{{title}}</h4>
				<p ibmTableHeaderDescription>{{description}}</p>
			</ibm-table-header>
			<!--
				app-* components are for demo purposes only.
				You can create your own implementation by using the component source as an example.
			-->
			<app-no-data-table
				[model]="model"
				[size]="size"
				[skeleton]="skeleton"
				[showSelectionColumn]="showSelectionColumn"
				[striped]="striped">
				<tbody><tr><td class="no-data" colspan="3"><div>No data.</div></td></tr></tbody>
			</app-no-data-table>
		</ibm-table-container>
		`,
		styles: [`
			.no-data {
				width: 100%;
				height: 150px;
				text-align: center;
			}
		`],
		props: getProps({
			model: emptyModel,
			description: text("Description", "With no data")
		})
	}))
	.add("With toolbar", () => ({
		template: `
		<section>
			<ibm-table-container>
				<ibm-table-header>
					<h4 ibmTableHeaderTitle>{{title}}</h4>
					<p ibmTableHeaderDescription>{{description}}</p>
				</ibm-table-header>
				<ibm-table-toolbar
					[model]="model"
					[batchText]="batchText"
					[size]="size"
					(cancel)="cancelMethod()"
					#toolbar>
					<ibm-table-toolbar-actions>
						<button ibmButton="primary" [tabindex]="toolbar.selected ? 0 : -1">
							Delete
							<svg ibmIcon="delete" size="16" class="bx--btn__icon"></svg>
						</button>
						<button ibmButton="primary" [tabindex]="toolbar.selected ? 0 : -1">
							Save
							<svg ibmIcon="save" size="16" class="bx--btn__icon"></svg>
						</button>
						<button ibmButton="primary" [tabindex]="toolbar.selected ? 0 : -1">
							Download
							<svg ibmIcon="download" size="16" class="bx--btn__icon"></svg>
						</button>
					</ibm-table-toolbar-actions>
					<ibm-table-toolbar-content *ngIf="!toolbar.selected">
						<ibm-table-toolbar-search
							ngDefaultControl
							[expandable]="true"
							[(ngModel)]="searchModel">
						</ibm-table-toolbar-search>
						<ibm-overflow-menu
							triggerClass="bx--toolbar-action"
							[customTrigger]="customTrigger"
							placement="bottom"
							[offset]="size === 'sm' ? null : offset">
							<ibm-overflow-menu-option>Option 1</ibm-overflow-menu-option>
							<ibm-overflow-menu-option>Option 2</ibm-overflow-menu-option>
							<ibm-overflow-menu-option disabled="true">Disabled</ibm-overflow-menu-option>
							<ibm-overflow-menu-option type="danger">Danger option</ibm-overflow-menu-option>
						</ibm-overflow-menu>
						<button ibmButton="primary" size="sm" [tabindex]="toolbar.selected ? -1 : 0">
							Primary button<svg ibmIcon="add" size="20" class="bx--btn__icon"></svg>
						</button>
					</ibm-table-toolbar-content>
				</ibm-table-toolbar>
				<!--
					app-* components are for demo purposes only.
					You can create your own implementation by using the component source as an example.
				-->
				<app-table
					[model]="model"
					[size]="size"
					[showSelectionColumn]="showSelectionColumn"
					[enableSingleSelect]="enableSingleSelect"
					[striped]="striped"
					[sortable]="sortable"
					[skeleton]="skeleton"
					[stickyHeader]="stickyHeader"
					[isDataGrid]="isDataGrid">
				</app-table>
				<ng-template #customTrigger><svg ibmIcon="settings" size="16"></svg></ng-template>
			</ibm-table-container>
		</section>
	`,
		props: getProps({
			cancelMethod: function() {
				console.log("Custom cancel method");
			},
			description: text("Description", "With toolbar"),
			searchModel: text("Search model", "Initial search value"),
			enableSingleSelect: boolean("Enable single select", false),
			batchText: object("Toolbar batch text", {
				SINGLE: "1 item selected",
				MULTIPLE: "{{count}} items selected"
			}),
			offset: { x: -9, y: 0 }
		})
	}))
	.add("With toolbar and disabled rows", () => ({
		template: `
		<ibm-table-container>
			<ibm-table-header>
				<h4 ibmTableHeaderTitle>{{title}}</h4>
				<p ibmTableHeaderDescription>{{description}}</p>
			</ibm-table-header>
			<ibm-table-toolbar [model]="model" [batchText]="batchText" #toolbar>
				<ibm-table-toolbar-actions>
					<button ibmButton="primary">
						Delete
						<svg ibmIcon="delete" size="16" class="bx--btn__icon"></svg>
					</button>
					<button ibmButton="primary">
						Save
						<svg ibmIcon="save" size="16" class="bx--btn__icon"></svg>
					</button>
					<button ibmButton="primary">
						Download
						<svg ibmIcon="download" size="16" class="bx--btn__icon"></svg>
					</button>
				</ibm-table-toolbar-actions>
				<ibm-table-toolbar-content *ngIf="!toolbar.selected">
					<ibm-table-toolbar-search [expandable]="true"></ibm-table-toolbar-search>
					<button ibmButton="ghost" class="toolbar-action">
						<svg ibmIcon="settings" size="16" class="bx--toolbar-action__icon"></svg>
					</button>
					<button ibmButton="primary" size="sm">
						Primary button<svg ibmIcon="add" size="20" class="bx--btn__icon"></svg>
					</button>
				</ibm-table-toolbar-content>
			</ibm-table-toolbar>
			<!--
				app-* components are for demo purposes only.
				You can create your own implementation by using the component source as an example.
			-->
			<app-no-data-table
				[model]="model"
				[size]="lg"
				[showSelectionColumn]="true"
				[striped]="striped"
				[sortable]="sortable"
				[isDataGrid]="isDataGrid">
			</app-no-data-table>
		</ibm-table-container>
	`,
		props: {
			model: getModelWithDisabledRows(),
			size: select("size", { Small: "sm", Short: "sh", Normal: "md", Large: "lg" }, "md"),
			title: text("Title", "Table title"),
			description: text("Description", "With toolbar and disabled rows"),
			striped: boolean("striped", false),
			sortable: boolean("sortable", true),
			isDataGrid: boolean("Data grid keyboard interactions", true),
			batchText: object("Toolbar batch text", {
				SINGLE: "1 item selected",
				MULTIPLE: "{{count}} items selected"
			})
		}
	}))
	.add("With toolbar without toolbar action", () => ({
		template: `
		<ibm-table-container>
			<ibm-table-header>
				<h4 ibmTableHeaderTitle>{{title}}</h4>
				<p ibmTableHeaderDescription>{{description}}</p>
			</ibm-table-header>
			<ibm-table-toolbar>
				<ibm-table-toolbar-content>
					<ibm-table-toolbar-search [expandable]="true"></ibm-table-toolbar-search>
					<button ibmButton="ghost" class="toolbar-action">
						<svg ibmIcon="settings" size="16" class="bx--toolbar-action__icon"></svg>
					</button>
					<button ibmButton="primary" size="sm">
						Primary button<svg ibmIcon="add" size="20" class="bx--btn__icon"></svg>
					</button>
				</ibm-table-toolbar-content>
			</ibm-table-toolbar>
			<!--
				app-* components are for demo purposes only.
				You can create your own implementation by using the component source as an example.
			-->
			<app-table
				[model]="model"
				[size]="size"
				[showSelectionColumn]="showSelectionColumn"
				[enableSingleSelect]="enableSingleSelect"
				[stickyHeader]="stickyHeader"
				[skeleton]="skeleton"
				[striped]="striped"
				[sortable]="sortable"
				[isDataGrid]="isDataGrid">
			</app-table>
		</ibm-table-container>
	`,
		props: getProps({
			description: text("Description", "With toolbar"),
			enableSingleSelect: boolean("Enable single select", false)
		})
	}))
	.add("Filtering by overriding isRowFiltered [Recommended]", () => ({
		template: `
		<!--
			app-* components are for demo purposes only.
			You can create your own implementation by using the component source as an example.
		-->
		<app-function-override-filter-table
			[stickyHeader]="stickyHeader"
			[size]="size"
			[skeleton]="skeleton"
			[showSelectionColumn]="showSelectionColumn"
			[striped]="striped"
			[isDataGrid]="isDataGrid">
		</app-function-override-filter-table>
		`,
		props: getProps({})
	}))
	.add("Filtering by alteration of model data", () => ({
		template: `
		<!--
			app-* components are for demo purposes only.
			You can create your own implementation by using the component source as an example.
		-->
		<app-model-filter-table
			[stickyHeader]="stickyHeader"
			[size]="size"
			[skeleton]="skeleton"
			[showSelectionColumn]="showSelectionColumn"
			[striped]="striped"
			[isDataGrid]="isDataGrid">
		</app-model-filter-table>
		`,
		props: getProps({})
	}))
	.add("With expansion", () => ({
		template: `
		<ibm-table-container>
			<ibm-table-header>
				<h4 ibmTableHeaderTitle>{{title}}</h4>
				<p ibmTableHeaderDescription>{{description}}</p>
			</ibm-table-header>
			<!--
				app-* components are for demo purposes only.
				You can create your own implementation by using the component source as an example.
			-->
			<app-expansion-table
				[size]="size"
				[showSelectionColumn]="showSelectionColumn"
				[sortable]="sortable"
				[stickyHeader]="stickyHeader"
				[skeleton]="skeleton"
				[striped]="striped"
				[isDataGrid]="isDataGrid">
			</app-expansion-table>
		</ibm-table-container>
		`,
		props: getProps({
			description: text("Description", "With expansion")
		})
	}))
	.add("With dynamic content", () => ({
		template: `
		<ibm-table-container>
			<ibm-table-header>
				<h4 ibmTableHeaderTitle>{{title}}</h4>
				<p ibmTableHeaderDescription>{{description}}</p>
			</ibm-table-header>
			<!--
				app-* components are for demo purposes only.
				You can create your own implementation by using the component source as an example.
			-->
			<app-custom-table
				[size]="size"
				[showSelectionColumn]="showSelectionColumn"
				[sortable]="sortable"
				[stickyHeader]="stickyHeader"
				[skeleton]="skeleton"
				[striped]="striped"
				[isDataGrid]="isDataGrid">
			</app-custom-table>
		</ibm-table-container>
		`,
		props: getProps({
			description: text("Description", "With dynamic content")
		})
	}))
	.add("With overflow menu", () => ({
		template: `
		<ibm-table-container>
			<ibm-table-header>
				<h4 ibmTableHeaderTitle>{{title}}</h4>
				<p ibmTableHeaderDescription>{{description}}</p>
			</ibm-table-header>
			<!--
				app-* components are for demo purposes only.
				You can create your own implementation by using the component source as an example.
			-->
			<app-overflow-table
				[size]="size"
				[showSelectionColumn]="showSelectionColumn"
				[sortable]="sortable"
				[stickyHeader]="stickyHeader"
				[skeleton]="skeleton"
				[striped]="striped"
				[isDataGrid]="isDataGrid">
			</app-overflow-table>
		</ibm-table-container>
		`,
		props: getProps({
			description: text("Description", "With overflow menu")
		})
	}))
	.add("With pagination", () => ({
		template: `
		<ibm-table-container>
			<ibm-table-header>
				<h4 ibmTableHeaderTitle>{{title}}</h4>
				<p ibmTableHeaderDescription>{{description}}</p>
			</ibm-table-header>
			<!--
				app-* components are for demo purposes only.
				You can create your own implementation by using the component source as an example.
			-->
			<app-pagination-table
				[skeleton]="skeleton"
				[sortable]="sortable"
				[totalDataLength]="totalDataLength"
				[showSelectionColumn]="showSelectionColumn"
				[stickyHeader]="stickyHeader"
				[skeleton]="skeleton"
				[model]="model">
			</app-pagination-table>
		</ibm-table-container>
		`,
		props: getProps({
			totalDataLength: number("totalDataLength", 105),
			description: text("Description", "With pagination")
		})
	}))
	.add("From components", () => ({
		template: `
			<table ibmTable [sortable]="false" style="width: 650px;">
				<thead ibmTableHead>
					<tr>
						<th
							scope="col"
							ibmTableHeadCell
							*ngFor="let column of model.header"
							[column]="column">
						</th>
					</tr>
				</thead>
				<tbody ibmTableBody>
					<tr
						*ngFor="let row of model.data"
						ibmTableRow
						[row]="row">
						<td
							*ngFor="let item of row; let j = index"
							ibmTableData
							[item]="item"
							[class]="model.header[j].className"
							[ngStyle]="model.header[j].style">
						</td>
					</tr>
				</tbody>
			</table>
		`,
		props: getProps()
	}))
	.add("Skeleton", () => ({
		template: `
			<!--
				app-* components are for demo purposes only.
				You can create your own implementation by using the component source as an example.
			-->
			<app-skeleton-table
				[skeletonModel]="skeletonModel"
				[size]="size"
				[striped]="striped">
			</app-skeleton-table>
	`,
		props: getProps()
	}))
	.add("Documentation", () => ({
		template: `
			<ibm-documentation src="documentation/classes/src_table.table.html"></ibm-documentation>
		`
	}));
