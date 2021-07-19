import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, select, text } from "@storybook/addon-knobs/angular";

import {
	CodeSnippetModule,
	ButtonModule } from "..";
import { Input, Component } from "@angular/core";
import { DocumentationModule } from "../documentation-component/documentation.module";

const code = `import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, boolean } from "@storybook/addon-knobs/angular";

import { CodeSnippetModule } from "..";

storiesOf("Components|CodeSnippet", module).addDecorator(
	moduleMetadata({
		imports: [CodeSnippetModule]
	})
)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: \`<ibm-code-snippet>code</ibm-code-snippet>\`,
		props: { // there's more
			// disabled: boolean("disabled", false)
		}
	}));`;

const lessCode = `import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, boolean } from "@storybook/addon-knobs/angular";

import { CodeSnippetModule } from "..";

storiesOf("Components|Code Snippet", module).addDecorator(
	moduleMetadata({
		imports: [CodeSnippetModule]
	})
) // that's it, no more after this line
`;

const singleLineOfCode = `import { UIShellModule } from 'carbon-components-angular'; // Single line of code`;

@Component({
	selector: "app-dynamic-code-snippet",
	template: `
		<button ibmButton (click)="openCodeSnippet()">Show Code Snippet</button>
		<ibm-code-snippet *ngIf="shouldShow" display="multi">{{displayedCode}}</ibm-code-snippet>
	`
})
export class DynamicCodeSnippet {
	shouldShow = false;

	@Input() displayedCode = code;

	openCodeSnippet() {
		this.shouldShow = !this.shouldShow;
	}
}

const inlineCode = "<inline code>";

storiesOf("Components|Code Snippet", module).addDecorator(
	moduleMetadata({
		declarations: [DynamicCodeSnippet],
		imports: [CodeSnippetModule, ButtonModule, DocumentationModule]
	})
)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `<ibm-code-snippet display="single">{{singleCode}}</ibm-code-snippet>`,
		props: {
			singleCode: singleLineOfCode
		}
	}))
	.add("Multi", () => ({
		template: `
			<h2>With a lot of code</h2>
			<ibm-code-snippet display="multi">{{code}}</ibm-code-snippet>

			<h2 style="margin-top: 60px">With less code</h2>
			<ibm-code-snippet display="multi">{{lessCode}}</ibm-code-snippet>
		`,
		props: {
			code,
			lessCode
		}
	}))
	.add("Inline", () => ({
		template: `Here is some <ibm-code-snippet display="inline" [theme]="theme">{{inlineCode}}</ibm-code-snippet> for you.`,
		props: {
			inlineCode,
			theme: select("Theme", ["dark", "light"], "dark")
		}
	}))
	.add("Skeleton", () => ({
		template: `
			<div style="width: 800px">
				<ibm-code-snippet display="single" skeleton="true"></ibm-code-snippet>
				<br>
				<ibm-code-snippet display="multi" skeleton="true"></ibm-code-snippet>
			</div>
		`
	}))
	.add("Dynamic", () => ({
		template: `
			<!--
				app-* components are for demo purposes only.
				You can create your own implementation by using the component source as an example.
			-->
			<app-dynamic-code-snippet [displayedCode]="displayedCode"></app-dynamic-code-snippet>
		`,
		props: {
			displayedCode: text("Displayed code", code)
		}
	}))
	.add("Documentation", () => ({
		template: `
			<ibm-documentation src="documentation/classes/src_code_snippet.codesnippet.html"></ibm-documentation>
		`
	}));
