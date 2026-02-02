import type { GeoLocationPositionType } from "../types/GeoLocationPositionType";

type GeocodeResponseType = {
	countryName: string;
	city: string;
	locality: string;
	postcode: string;
};

export async function getAddress(position: GeoLocationPositionType) {
	try {
		const res = await fetch(
			`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.lat}&longitude=${position.lng}&localityLanguage=en`,
		);
		if (!res.ok)
			throw new Error(
				"Something's wrong when fetching your location, try again later",
			);
		const data: GeocodeResponseType = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
