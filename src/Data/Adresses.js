import { icons } from "../assets";
import { strings } from "../i18n";

const Adresses = [
    {
        id: 1,
        img: icons.HomeIcon,
        name: 'Home',
        fullAddress: "Abdelrahman 1008 Emirates Towers, Tower 6 Seven towers complex, Dubai Silicon Oasis Dubai"
    },
    {
        id: 2,
        img: icons.LocationIcon,
        name: 'Second home',
        fullAddress: 'Abdelrahman 11 Test, Test building Dso, Dubai Silicon Oasis Dubai'
    }
];

export const AdressesType = [
	{
        id: 3,
        img: icons.HouseIcon,
        name: 'Home',
    },
	{
        id: 2,
        img: icons.JobIcon,
        name: 'Work',
    },
    {
        id: 1,
        img: icons.AddressIcon2,
        name: 'Others',
    }
];

export const Cites = [
    {
        id: 1,
        name: 'Abu Dhabi',
    },
    {
        id: 2,
        name: 'Ajman',
    },
    {
        id: 3,
        name: 'Al Ain',
    },
    {
        id: 4,
        name: 'Dubai',
    },
];

export const apartmentTypes = [
    {
        id: 1,
        name: strings("Vila"),
    },
    {
        id: 2,
        name: strings("Apartment"),
    },
    {
        id: 3,
        name: strings("Other"),
    },

]
export default Adresses;
