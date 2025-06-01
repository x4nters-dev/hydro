import i18n from "@sveltekit-i18n/base";
import parser from "@sveltekit-i18n/parser-default";

export const { t, locale, locales, loadTranslations, translations } = new i18n({
	parser: parser(),
	loaders: [
		{
			locale: "en",
			key: "",
			loader: async () => await import("./assets/en.json"),
		},
		{
			locale: "pl",
			key: "",
			loader: async () => await import("./assets/pl.json"),
		},
	],
});
