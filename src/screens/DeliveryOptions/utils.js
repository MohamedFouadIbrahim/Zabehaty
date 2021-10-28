import { strings } from '../../i18n';
import { getDateRanges } from '../../utils';

export const checkIfDateOrDay = ({
    date_style,
    date_from,
    date_to,
    available_days
}) => {

    let availableDatesOrDayes;

    if (date_style === "date" || date_style === "range") {
        availableDatesOrDayes = getDateRanges(date_from, date_to)
    } else {
		const days = available_days.map( day => {
			let obj = { title: "", day: day }
			switch(day) {
				case 1:
					obj.title = strings("First day")
					break;
				case 2:
					obj.title = strings("Second day")
					break;
				case 3:
					obj.title = strings("Third day")
					break;
				case 4:
					obj.title = strings("Fourth day")
					break;
				default:
					break;
			}
			return obj
		})
        availableDatesOrDayes = days
    }

    return availableDatesOrDayes
}
