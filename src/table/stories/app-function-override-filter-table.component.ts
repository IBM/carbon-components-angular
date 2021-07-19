import {
	Component,
	OnInit,
	Input
} from "@angular/core";
import { TableModel } from "../table-model.class";
import { TableHeaderItem } from "../table-header-item.class";
import { TableItem } from "../table-item.class";

@Component({
	selector: "app-function-override-filter-table",
	template: `
	<ibm-table-container>
		<ibm-table-header>
			<h4 ibmTableHeaderTitle>Filter table</h4>
			<p ibmTableHeaderDescription>
				Use the toolbar's search functionality to filter node names
				or click the filter icon to filter country names
			</p>
		</ibm-table-header>
		<ibm-table-toolbar>
			<ibm-table-toolbar-content>
				<ibm-table-toolbar-search
					[expandable]="true"
					(valueChange)="filterNodeNames($event)"
					(clear)="searchValue = ''">
				</ibm-table-toolbar-search>
				<button
					ibmButton="ghost"
					class="toolbar-action"
					[ibmOverflowMenu]="templateRef"
					placement="bottom"
					[flip]="true"
					[offset]="{ x: 3, y: 0 }">
					<svg ibmIcon="filter" size="16" class="bx--toolbar-action__icon"></svg>
				</button>
				<button ibmButton="primary" size="sm">
					Primary button<svg ibmIcon="add" size="20" class="bx--btn__icon"></svg>
				</button>
			</ibm-table-toolbar-content>
		</ibm-table-toolbar>
		<ibm-table
			[model]="model"
			[sortable]="false"
			[size]="size"
			[skeleton]="skeleton"
			[showSelectionColumn]="showSelectionColumn"
			[enableSingleSelect]="enableSingleSelect"
			[stickyHeader]="stickyHeader"
			[striped]="striped"
			[isDataGrid]="isDataGrid">
			<ng-content></ng-content>
		</ibm-table>
	</ibm-table-container>

	<ng-template #templateRef>
		<div style="padding: 0 1rem;" (click)="overflowOnClick($event)">
			<div style="padding-top: 0.5rem; color: grey;">Countries shown</div>
			<ibm-checkbox
				[checked]="displayedCountries.includes('US')"
				(checkedChange)="filterCountries('US', $event)">
				US
			</ibm-checkbox>
			<ibm-checkbox
				[checked]="displayedCountries.includes('France')"
				(checkedChange)="filterCountries('France', $event)">
				France
			</ibm-checkbox>
			<ibm-checkbox
				[checked]="displayedCountries.includes('Argentina')"
				(checkedChange)="filterCountries('Argentina', $event)">
				Argentina
			</ibm-checkbox>
			<ibm-checkbox
				[checked]="displayedCountries.includes('Japan')"
				(checkedChange)="filterCountries('Japan', $event)">
				Japan
			</ibm-checkbox>
		</div>
	</ng-template>
	`
})
export class FilterByFunctionOverrideStory implements OnInit {
	@Input() size = "md";
	@Input() showSelectionColumn = true;
	@Input() enableSingleSelect = false;
	@Input() striped = true;
	@Input() isDataGrid = false;
	@Input() noData = false;
	@Input() stickyHeader = false;
	@Input() skeleton = false;

	model = new TableModel();
	displayedCountries = ["US", "France", "Argentina", "Japan"];
	searchValue = "";

	dataset = [
		[
			new TableItem({ data: "800" }),
			new TableItem({ data: "East Sadye" }),
			new TableItem({ data: "Store" }),
			new TableItem({ data: "US" })
		],
		[
			new TableItem({ data: "500" }),
			new TableItem({ data: "Lueilwitzview" }),
			new TableItem({ data: "Store" }),
			new TableItem({ data: "US" })
		],
		[
			new TableItem({ data: "120" }),
			new TableItem({ data: "East Arcelyside" }),
			new TableItem({ data: "Store" }),
			new TableItem({ data: "France" })
		],
		[
			new TableItem({ data: "119" }),
			new TableItem({ data: "West Dylan" }),
			new TableItem({ data: "Store" }),
			new TableItem({ data: "Argentina" })
		],
		[
			new TableItem({ data: "54" }),
			new TableItem({ data: "Brandynberg" }),
			new TableItem({ data: "Store" }),
			new TableItem({ data: "Japan" })
		],
		[
			new TableItem({ data: "15" }),
			new TableItem({ data: "Stoltenbergport" }),
			new TableItem({ data: "Store" }),
			new TableItem({ data: "Canada" })
		],
		[
			new TableItem({ data: "12" }),
			new TableItem({ data: "Rheabury" }),
			new TableItem({ data: "Store" }),
			new TableItem({ data: "US" })
		]
	];

	filterNodeNames(searchString: string) {
		this.searchValue = searchString;
	}

	filterCountries(countryName: string, checked: boolean) {
		if (checked) {
			this.displayedCountries.push(countryName);
		} else {
			this.displayedCountries.splice(this.displayedCountries.indexOf(countryName), 1);
		}
	}

	overflowOnClick = (event: any) => {
		event.stopPropagation();
	}

	ngOnInit() {
		this.model.header = [
			new TableHeaderItem({
				data: "Node ID"
			}),
			new TableHeaderItem({
				data: "Node name"
			}),
			new TableHeaderItem({
				data: "Node type"
			}),
			new TableHeaderItem({
				data: "Country"
			})
		];

		this.model.data = this.dataset;

		this.model.isRowFiltered = (index: number) => {
			const nodeName = this.model.row(index)[1].data;
			const countryName = this.model.row(index)[3].data;
			return !nodeName.toLowerCase().includes(this.searchValue.toLowerCase())
				|| !this.displayedCountries.includes(countryName);
		};
	}
}
