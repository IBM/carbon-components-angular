import { Search } from "carbon-components-angular/search";
import {
	Component,
	HostBinding,
	Input,
	OnInit,
	AfterViewInit
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
	selector: "ibm-table-toolbar-search",
	templateUrl: "../../search/search.component.html",
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: TableToolbarSearch,
			multi: true
		}
	]
})
export class TableToolbarSearch extends Search implements OnInit, AfterViewInit {
	tableSearch = true;

	@Input() expandable = false;

	@HostBinding("class.bx--toolbar-content") hostClass = true;

	ngOnInit() {
		this.size = "xl";
		if (this.expandable) {
			this.toolbar = true;
		}
	}

	ngAfterViewInit() {
		setTimeout(() => {
			if (this.value) {
				this.openSearch();
			}
		});
	}
}
