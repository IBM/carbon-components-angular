// modules
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";

// imports
import { IconDirective } from "./icon.directive";
import { IconService } from "./icon.service";

// icon imports
import Add16 from "@carbon/icons/es/add/16";
import Add20 from "@carbon/icons/es/add/20";
import Bee16 from "@carbon/icons/es/bee/16";
import Bee20 from "@carbon/icons/es/bee/20";
import Calendar16 from "@carbon/icons/es/calendar/16";
import Carbon16 from "@carbon/icons/es/carbon/16";
import Carbon20 from "@carbon/icons/es/carbon/20";
import CaretDown16 from "@carbon/icons/es/caret--down/16";
import CaretLeft16 from "@carbon/icons/es/caret--left/16";
import CaretRight16 from "@carbon/icons/es/caret--right/16";
import CaretUp16 from "@carbon/icons/es/caret--up/16";
import Checkmark16 from "@carbon/icons/es/checkmark/16";
import CheckmarkFilled16 from "@carbon/icons/es/checkmark--filled/16";
import CheckmarkFilled20 from "@carbon/icons/es/checkmark--filled/20";
import CheckmarkOutline16 from "@carbon/icons/es/checkmark--outline/16";
import ChevronDown16 from "@carbon/icons/es/chevron--down/16";
import ChevronRight16 from "@carbon/icons/es/chevron--right/16";
import Close16 from "@carbon/icons/es/close/16";
import Close20 from "@carbon/icons/es/close/20";
import Copy16 from "@carbon/icons/es/copy/16";
import Copy20 from "@carbon/icons/es/copy/20";
import Data216 from "@carbon/icons/es/data--2/16";
import Data220 from "@carbon/icons/es/data--2/20";
import Delete16 from "@carbon/icons/es/delete/16";
import Document16 from "@carbon/icons/es/document/16";
import Document20 from "@carbon/icons/es/document/20";
import Download16 from "@carbon/icons/es/download/16";
import ErrorFilled16 from "@carbon/icons/es/error--filled/16";
import ErrorFilled20 from "@carbon/icons/es/error--filled/20";
import Fade16 from "@carbon/icons/es/fade/16";
import Fade20 from "@carbon/icons/es/fade/20";
import InformationFilled16 from "@carbon/icons/es/information--filled/16";
import InformationFilled20 from "@carbon/icons/es/information--filled/20";
import Menu16 from "@carbon/icons/es/menu/16";
import Menu20 from "@carbon/icons/es/menu/20";
import OverflowMenuVertical16 from "@carbon/icons/es/overflow-menu--vertical/16";
import OverflowMenuHorizontal16 from "@carbon/icons/es/overflow-menu--horizontal/16";
import Save16 from "@carbon/icons/es/save/16";
import Search16 from "@carbon/icons/es/search/16";
import Settings16 from "@carbon/icons/es/settings/16";
import SettingsAdjust16 from "@carbon/icons/es/settings--adjust/16";
import Subtract16 from "@carbon/icons/es/subtract/16";
import Warning16 from "@carbon/icons/es/warning/16";
import WarningFilled16 from "@carbon/icons/es/warning--filled/16";
import WarningFilled20 from "@carbon/icons/es/warning--filled/20";
import WarningAltFilled16 from "@carbon/icons/es/warning--alt--filled/16";

// either provides a new instance of IconService, or returns the parent
export function ICON_SERVICE_PROVIDER_FACTORY(parentService: IconService) {
	return parentService || new IconService();
}

// icon service *must* be a singleton to ensure that icons are accessible globally and not duplicated
export const ICON_SERVICE_PROVIDER = {
	provide: IconService,
	deps: [[new Optional(), new SkipSelf(), IconService]],
	useFactory: ICON_SERVICE_PROVIDER_FACTORY
};

@NgModule({
	declarations: [
		IconDirective
	],
	exports: [
		IconDirective
	],
	imports: [
		CommonModule
	],
	providers: [
		ICON_SERVICE_PROVIDER
	]
})
export class IconModule {
	constructor(protected iconService: IconService) {
		iconService.registerAll([
			Add16,
			Add20,
			Bee16,
			Bee20,
			Calendar16,
			Carbon16,
			Carbon20,
			CaretDown16,
			CaretLeft16,
			CaretRight16,
			CaretUp16,
			Checkmark16,
			CheckmarkFilled16,
			CheckmarkFilled20,
			CheckmarkOutline16,
			ChevronDown16,
			ChevronRight16,
			Close16,
			Close20,
			Copy16,
			Copy20,
			Data216,
			Data220,
			Delete16,
			Document16,
			Document20,
			Download16,
			ErrorFilled16,
			ErrorFilled20,
			Fade16,
			Fade20,
			InformationFilled16,
			InformationFilled20,
			Menu16,
			Menu20,
			OverflowMenuVertical16,
			OverflowMenuHorizontal16,
			Save16,
			Search16,
			Settings16,
			SettingsAdjust16,
			Subtract16,
			Warning16,
			WarningFilled16,
			WarningFilled20,
			WarningAltFilled16
		]);
	}
}
