import { DEFAULT_LOCALE } from "$lib/consts/defaultLocale.const";
import { loadTranslations } from "$lib/i18n";

export async function load({ url }) {
	await loadTranslations(DEFAULT_LOCALE, url.pathname);

	return {};
}
