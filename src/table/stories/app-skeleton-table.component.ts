import {
	Component,
	OnInit,
	Input,
	OnChanges
} from "@angular/core";
import { TableModel } from "../table-model.class";
import {
	Table,
	TableHeaderItem,
	TableItem
} from "../table.module";

@Component({
	selector: "app-skeleton-table",
	template: `
		<ibm-table
			style="display: block; width: 800px;"
			[model]="skeletonModel"
			[skeleton]="skeleton"
			[size]="size"
			[striped]="striped">
			<ng-content></ng-content>
		</ibm-table>
	`
})
export class SkeletonTableStory implements OnInit, OnChanges {
	@Input() size = "md";
	@Input() striped = false;
	@Input() skeleton = true;
	@Input() skeletonModel = new TableModel();
	@Input() model = new TableModel();
	@Input() withInitialModel = false;

	ngOnInit() {
		this.model.header = [
			new TableHeaderItem({
				data: "Name"
			}),
			new TableHeaderItem({
				data: "hwer",
				className: "my-class"
			})
		];

		this.model.data = [
			[new TableItem({ data: "Name 1" }), new TableItem({ data: "qwer" })],
			[new TableItem({ data: "Name 3" }), new TableItem({ data: "zwer" })],
			[new TableItem({ data: "Name 2" }), new TableItem({ data: "swer" })],
			[new TableItem({ data: "Name 4" }), new TableItem({data: "twer"})],
			[new TableItem({ data: "Name 5" }), new TableItem({data: "twer"})],
			[new TableItem({ data: "Name 6" }), new TableItem({data: "twer"})],
			[new TableItem({ data: "Name 7" }), new TableItem({data: "twer"})]
		];
		console.log("in oninit: ",this.model);
		this.skeletonModel = Table.skeletonModel(3, 5, this.withInitialModel ? this.model : null);
	}

	ngOnChanges() {
		this.skeletonModel = Table.skeletonModel(3, 5, this.withInitialModel ? this.model : null);
		console.log("in onchanges: ",this.model);
	}
}
