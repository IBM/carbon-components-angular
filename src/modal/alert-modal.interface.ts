export enum AlertModalType {
	default = "default",
	danger = "danger"
}

export interface AlertModalData {
	/**
	 * Use of `modalType` is deprecated, use `type` instead
	 */
	modalType?: string;
	/**
	 * type of the modal
	 */
	type?: AlertModalType;
	/**
	 * Use of `modalLabel` is deprecated, use `label` instead
	 */
	modalLabel?: string;
	/**
	 * Additional label shown over the modal
	 */
	label?: string;
	/**
	 * Use of `modalTitle` is deprecated, use `title` instead
	 */
	modalTitle?: string;
	/**
	 * Primary title for the modal
	 */
	title?: string;
	/**
	 * Use of `modalContent` is deprecated, use `content` instead
	 */
	modalContent?: string;
	/**
	 * Content for the modal body, could include HTML tags
	 */
	content?: string;
	/**
	 * Size of the modal to display.
	 */
	size?: "xs" | "sm" | "lg";
	/**
	 * Array of `ModalButton`s
	 */
	buttons?: Array<ModalButton>;
	/**
	 * Callback for non-specific close events. `return false;` to prevent the modal from closing
	 * trigger : "overlay" | "close"
	 */
	close?: (trigger : string) => {};

}

export enum ModalButtonType {
	primary = "primary",
	secondary = "secondary",
	tertiary = "tertiary",
	ghost = "ghost",
	danger = "danger",
	danger_primary = "danger--primary"
}

export interface ModalButton {
	/**
	 * Display value of the button
	 */
	text: string;
	/**
	 * Optional unique ID for the button
	 */
	id?: string;
	/**
	 * Button type
	 */
	type?: ModalButtonType;
	/**
	 * Callback for the button `click` event
	 */
	click?: Function;
}
