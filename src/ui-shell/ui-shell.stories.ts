import { action } from "@storybook/addon-actions";
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, boolean } from "@storybook/addon-knobs/angular";

import { NavigationItem, UIShellModule } from "./index";
import { SearchModule } from "./../search/index";
import { DialogModule } from "./../dialog/index";
import { DocumentationModule } from "./../documentation-component/documentation.module";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IconModule } from "../icon/icon.module";


@Component({
	selector: "app-bar",
	template: "<h1>bar</h1>"
})
class BarComponent { }

@Component({
	selector: "app-foo",
	template: "<h1>foo</h1>"
})
class FooComponent { }

@Component({
	selector: "app-header-fluid",
	template: `
		<ibm-header name="[Platform]">
			<ibm-hamburger
				(selected)="hasHamburger = !hasHamburger"
				class="bx--header__menu-toggle__hidden"></ibm-hamburger>
			<ibm-header-navigation [navigationItems]="headerItems"></ibm-header-navigation>
			<ibm-sidenav
				*ngIf="hasHamburger"
				[navigationItems]="headerItems"
				class="bx--header__menu-toggle__hidden"></ibm-sidenav>
		</ibm-header>
	`
})
class HeaderFluidComponent {
	@Input() headerItems: NavigationItem[];
	hasHamburger = false;
}

storiesOf("Components|UI Shell", module)
	.addDecorator(
		moduleMetadata({
			declarations: [BarComponent, FooComponent, HeaderFluidComponent],
			imports: [
				IconModule,
				UIShellModule,
				SearchModule,
				DialogModule,
				DocumentationModule,
				RouterModule.forRoot([
					{
						path: "bar",
						component: BarComponent
					},
					{
						path: "foo",
						component: FooComponent
					}
				], {
					initialNavigation: false,
					useHash: true
				})
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Header", () => ({
		template: `
			<ibm-header name="[Platform]">
				<ibm-hamburger *ngIf="hasHamburger" (click)="expanded($event)"></ibm-hamburger>
				<ibm-header-navigation>
					<ibm-header-item>Catalog</ibm-header-item>
					<ibm-header-item isCurrentPage="true">Docs</ibm-header-item>
					<ibm-header-item>Support</ibm-header-item>
					<ibm-header-menu title="Manage">
						<ibm-header-item>Link 1</ibm-header-item>
						<ibm-header-item>Link 2</ibm-header-item>
						<ibm-header-item>Link 3</ibm-header-item>
					</ibm-header-menu>
				</ibm-header-navigation>
				<ibm-header-global>
					<ibm-header-action title="action">
						<svg ibmIcon="fade" size="20"></svg>
					</ibm-header-action>
					<ibm-header-action title="action">
						<svg ibmIcon="fade" size="20"></svg>
					</ibm-header-action>
				</ibm-header-global>
			</ibm-header>
		`,
		props: {
			hasHamburger: boolean("Show Hamburger", true),
			expanded: action("Menu clicked")
		}
	}))
	.add("Header fluid items to side navigation", () => ({
		template: `
			<app-header-fluid [headerItems]="headerItems"></app-header-fluid>
		`,
		props: {
			headerItems: <NavigationItem[]>[
				{
					type: "item",
					content: "Catalog",
					title: "Catalog"
				},
				{
					type: "item",
					content: "Docs",
					isCurrentPage: true
				},
				{
					type: "item",
					content: "Support"
				},
				{
					type: "menu",
					title: "Manage",
					menuItems: [
						{
							type: "item",
							content: "Link 1"
						},
						{
							type: "item",
							content: "Link 2"
						},
						{
							type: "item",
							content: "Link 3"
						}
					]
				}
			]
		}
	}))
	.add("Header with template", () => ({
		template: `
			<ibm-header name="[Platform]" [brand]="brandTemplate">
				<ibm-hamburger *ngIf="hasHamburger" (click)="expanded($event)"></ibm-hamburger>
				<ibm-header-navigation>
					<ibm-header-item>Catalog</ibm-header-item>
					<ibm-header-item>Docs</ibm-header-item>
					<ibm-header-item>Support</ibm-header-item>
					<ibm-header-menu title="Manage">
						<ibm-header-item>Link 1</ibm-header-item>
						<ibm-header-item>Link 2</ibm-header-item>
						<ibm-header-item>Link 3</ibm-header-item>
					</ibm-header-menu>
				</ibm-header-navigation>
				<ibm-header-global>
					<ibm-header-action title="action">
						<svg ibmIcon="fade" size="20"></svg>
					</ibm-header-action>
					<ibm-header-action title="action">
						<svg ibmIcon="fade" size="20"></svg>
					</ibm-header-action>
				</ibm-header-global>
			</ibm-header>

			<ng-template #brandTemplate>
				<a class="bx--header__name">
					<svg ibmIcon="carbon" size="32" style="stroke:white;fill:white"></svg>
					<span class="bx--header__name--prefix">IBM</span>
					[Platform]
				</a>
			</ng-template>
		`,
		props: {
			hasHamburger: boolean("Show Hamburger", true),
			expanded: action("Menu clicked")
		}
	}))
	.add("Header with router", () => ({
		template: `
			<ibm-header name="[Platform]" [route]="['bar']">
				<ibm-header-navigation>
					<ibm-header-item [route]="['foo']">Catalog</ibm-header-item>
					<ibm-header-item [route]="['bar']">Docs</ibm-header-item>
					<ibm-header-item [route]="['foo']">Support</ibm-header-item>
					<ibm-header-menu title="Manage">
						<ibm-header-item [route]="['foo']">Link 1</ibm-header-item>
						<ibm-header-item [route]="['bar']">Link 2</ibm-header-item>
						<ibm-header-item [route]="['foo']">Link 3</ibm-header-item>
					</ibm-header-menu>
				</ibm-header-navigation>
			</ibm-header>
			<div style="margin-top: 2rem">
				<router-outlet></router-outlet>
			</div>
		`,
		props: {
			expanded: action("Menu clicked")
		}
	}))
	.add("Side Navigation", () => ({
		template: `
			<ibm-sidenav>
				<ibm-sidenav-item>
					<svg ibmIcon="fade" size="16"></svg>
					Link
				</ibm-sidenav-item>
				<ibm-sidenav-item>
					<svg ibmIcon="fade" size="16"></svg>
					Link
				</ibm-sidenav-item>
				<ibm-sidenav-menu title="Category title">
					<svg ibmIcon="fade" size="16"></svg>
					<ibm-sidenav-item>Link</ibm-sidenav-item>
					<ibm-sidenav-item>Link</ibm-sidenav-item>
					<ibm-sidenav-item>Link</ibm-sidenav-item>
				</ibm-sidenav-menu>
			</ibm-sidenav>
		`,
		props: {
			options: [
				{
					content: "Option 1",
					value: 1
				},
				{
					content: "Option 2",
					value: 2
				},
				{
					content: "Option 3",
					value: 3
				}
			]
		}
	}))
	.add("Side Navigation with router", () => ({
		template: `
			<ibm-sidenav>
				<ibm-sidenav-item [route]="['foo']">
					<svg ibmIcon="fade" size="16"></svg>
					Link
				</ibm-sidenav-item>
				<ibm-sidenav-item [route]="['bar']">
					<svg ibmIcon="fade" size="16"></svg>
					Link
				</ibm-sidenav-item>
				<ibm-sidenav-menu title="Category title">
					<svg ibmIcon="fade" size="16"></svg>
					<ibm-sidenav-item [route]="['foo']">Link</ibm-sidenav-item>
					<ibm-sidenav-item [route]="['bar']">Link</ibm-sidenav-item>
					<ibm-sidenav-item [route]="['foo']">Link</ibm-sidenav-item>
				</ibm-sidenav-menu>
			</ibm-sidenav>
			<div>
				<router-outlet></router-outlet>
			</div>
		`
	}))
	.add("Right Panel with router", () => ({
		template: `
			<ibm-panel expanded="true">
				<ibm-switcher-list>
					<ibm-switcher-list-item [route]="['foo']">Switcher item one</ibm-switcher-list-item>
					<ibm-switcher-list-item [route]="['bar']">Switcher item two</ibm-switcher-list-item>
					<ibm-switcher-list-item [route]="['foo']">Switcher item three</ibm-switcher-list-item>
					<ibm-switcher-list-item [route]="['bar']">Switcher item four</ibm-switcher-list-item>
				</ibm-switcher-list>
			</ibm-panel>
			<div>
				<router-outlet></router-outlet>
			</div>
		`
	}))
	.add("Together", () => ({
		template: `
			<ibm-header name="[Platform]">
				<ibm-hamburger *ngIf="hasHamburger" [active]="active" (selected)="active = !active"></ibm-hamburger>
				<ibm-header-navigation>
					<ibm-header-item>Catalog</ibm-header-item>
					<ibm-header-item>Docs</ibm-header-item>
					<ibm-header-item>Support</ibm-header-item>
					<ibm-header-menu title="Manage">
						<ibm-header-item>Link 1</ibm-header-item>
						<ibm-header-item>Link 2</ibm-header-item>
						<ibm-header-item>Link 3</ibm-header-item>
					</ibm-header-menu>
				</ibm-header-navigation>
				<ibm-header-global>
					<ibm-header-action #firstAction title="action">
						<svg ibmIcon="fade" size="20"></svg>
					</ibm-header-action>
					<ibm-header-action [(active)]="secondAction" title="action">
						<svg ibmIcon="fade" size="20"></svg>
					</ibm-header-action>
				</ibm-header-global>
			</ibm-header>
			<ibm-sidenav [expanded]="active">
				<ibm-sidenav-item>
					<svg ibmIcon="fade" size="16"></svg>
					Link
				</ibm-sidenav-item>
				<ibm-sidenav-item>
					<svg ibmIcon="fade" size="16"></svg>
					Link
				</ibm-sidenav-item>
				<ibm-sidenav-menu title="Category title">
					<svg ibmIcon="fade" size="16"></svg>
					<ibm-sidenav-item>Link</ibm-sidenav-item>
					<ibm-sidenav-item [active]="hasActiveChild">Link</ibm-sidenav-item>
					<ibm-sidenav-item>Link</ibm-sidenav-item>
				</ibm-sidenav-menu>
			</ibm-sidenav>
			<ibm-panel [expanded]="firstAction.active"></ibm-panel>
			<ibm-panel [expanded]="secondAction">
				<ibm-switcher-list>
					<ibm-switcher-list-item active="true">Switcher item one</ibm-switcher-list-item>
					<ibm-switcher-list-item>Switcher item two</ibm-switcher-list-item>
					<ibm-switcher-list-item>Switcher item three</ibm-switcher-list-item>
					<ibm-switcher-list-item>Switcher item four</ibm-switcher-list-item>
				</ibm-switcher-list>
			</ibm-panel>
		`,
		props: {
			hasHamburger: boolean("Show Hamburger", true),
			active: boolean("Left panel active", true),
			secondAction: boolean("Second right panel active", false),
			hasActiveChild: boolean("Active side nav child", true),
			options: [
				{
					content: "Option 1",
					value: 1
				},
				{
					content: "Option 2",
					value: 2
				},
				{
					content: "Option 3",
					value: 3
				}
			]
		}
	}))
	.add("Side Navigation Rail", () => ({
		template: `
			<ibm-sidenav rail="true" [expanded]="false">
				<ibm-sidenav-item>
					<svg ibmIcon="fade" size="16"></svg>
					Link
				</ibm-sidenav-item>
				<ibm-sidenav-item>
					<svg ibmIcon="fade" size="16"></svg>
					Link
				</ibm-sidenav-item>
				<ibm-sidenav-menu title="Category title">
					<svg ibmIcon="fade" size="16"></svg>
					<ibm-sidenav-item>Link</ibm-sidenav-item>
					<ibm-sidenav-item>Link</ibm-sidenav-item>
					<ibm-sidenav-item>Link</ibm-sidenav-item>
				</ibm-sidenav-menu>
			</ibm-sidenav>
		`,
		props: {
			options: [
				{
					content: "Option 1",
					value: 1
				},
				{
					content: "Option 2",
					value: 2
				},
				{
					content: "Option 3",
					value: 3
				}
			]
		}
	}))
	.add("With Model", () => ({
		template: `
			<ibm-header name="[Platform]">
				<ibm-hamburger *ngIf="hasHamburger" [active]="active" (selected)="active = !active"></ibm-hamburger>
				<ibm-header-navigation [navigationItems]="headerItems">
				</ibm-header-navigation>
				<ibm-header-global>
					<ibm-header-action #firstAction title="action">
						<svg
							width="20"
							height="20"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 32 32"
							aria-hidden="true">
							<path
								d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12
								12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86
								23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14
								14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59
								10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59
								10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
						</svg>
					</ibm-header-action>
					<ibm-header-action #secondAction title="action">
						<svg
							width="20"
							height="20"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 32 32"
							aria-hidden="true">
							<path
								d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12
								12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86
								23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14
								14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59
								10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59
								10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
						</svg>
					</ibm-header-action>
				</ibm-header-global>
			</ibm-header>
			<ibm-sidenav [navigationItems]="headerItems">
				<ibm-sidenav-menu title="Category title">
					<svg icon width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
						<path
							d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12
							12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86
							23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14
							14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59
							10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59
							10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
					</svg>
					<ibm-sidenav-item>Link</ibm-sidenav-item>
					<ibm-sidenav-item>Link</ibm-sidenav-item>
					<ibm-sidenav-item>Link</ibm-sidenav-item>
				</ibm-sidenav-menu>
			</ibm-sidenav>
			<ibm-panel [expanded]="firstAction.active"></ibm-panel>
			<ibm-panel [expanded]="secondAction.active">
				<ibm-switcher-list>
					<ibm-switcher-list-item active="true">Switcher item one</ibm-switcher-list-item>
					<ibm-switcher-list-item>Switcher item two</ibm-switcher-list-item>
					<ibm-switcher-list-item>Switcher item three</ibm-switcher-list-item>
					<ibm-switcher-list-item>Switcher item four</ibm-switcher-list-item>
				</ibm-switcher-list>
			</ibm-panel>
			<router-outlet></router-outlet>
		`,
		props: {
			hasHamburger: boolean("Show Hamburger", true),
			active: boolean("Left panel active", true),
			options: [
				{
					content: "Option 1",
					value: 1
				},
				{
					content: "Option 2",
					value: 2
				},
				{
					content: "Option 3",
					value: 3
				}
			],
			headerItems: [{
				type: "item",
				route: ["foo"],
				content: "Catalog"
			},
			{
				type: "item",
				route: ["bar"],
				content: "Docs"
			},
			{
				type: "item",
				route: ["foo"],
				content: "Support"
			},
			{
				type: "menu",
				title: "Manage",
				trigger: "click",
				menuItems: [
					{
						type: "item",
						route: ["foo"],
						content: "Link 1"
					},
					{
						type: "item",
						route: ["bar"],
						content: "Link 2"
					}
				]
			}
			]
		}
	}))
	.add("Use angular router attributes for routing", () => (
		{
			template: `
			<ibm-header name="[Platform]" [route]="['bar']" [useRouter]="true">
				<ibm-header-navigation>
					<ibm-header-item [route]="['foo']" [useRouter]="true" [activeLinkClass]="'item--active'">Catalog</ibm-header-item>
					<ibm-header-item [route]="['bar']" [useRouter]="true" [activeLinkClass]="['item--active', 'another-class']">Docs</ibm-header-item>
					<ibm-header-item [route]="['foo']" [useRouter]="true">Support</ibm-header-item>
					<ibm-header-menu title="Manage">
						<ibm-header-item [route]="['foo']" [useRouter]="true">Link 1</ibm-header-item>
						<ibm-header-item [route]="['bar']" [useRouter]="true">Link 2</ibm-header-item>
						<ibm-header-item [route]="['foo']" [useRouter]="true">Link 3</ibm-header-item>
					</ibm-header-menu>
				</ibm-header-navigation>
			</ibm-header>
			<div style="margin-top: 2rem">
				<router-outlet></router-outlet>
			</div>`
		}
	))
	.add("Header Documentation", () => ({
		template: `
			<ibm-documentation src="documentation/classes/src_ui_shell_header.header.html"></ibm-documentation>
		`
	}))
	.add("Panel Documentation", () => ({
		template: `
			<ibm-documentation src="documentation/classes/src_ui_shell_panel.panel.html"></ibm-documentation>
		`
	}))
	.add("Side Nav Documentation", () => ({
		template: `
			<ibm-documentation src="documentation/classes/src_ui_shell_sidenav.sidenav.html"></ibm-documentation>
		`
	}));
