import { loadTranslations } from "$lib/i18n";
import { DEFAULT_LOCALE } from "$lib/consts/defaultLocale.const";

export async function load({ url }) {
	await loadTranslations(DEFAULT_LOCALE, url.pathname);

	return {};
}
