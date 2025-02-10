export function getFlagEmoji(location: string): string {
	const cleanLocation = location.trim().toLowerCase();

	const country = countryList.find((country) =>
		cleanLocation.includes(country.name.toLowerCase())
	);

	return country?.flagEmoji || '';
}	

export const countryList = [
	{
		name: 'Afghanistan',
		code: 'AF',
		phoneCode: '+93',
		flagEmoji: '🇦🇫',
	},
	{
		name: 'Aland Islands',
		code: 'AX',
		phoneCode: '+358',
		flagEmoji: '🇦🇽',
	},
	{
		name: 'Albania',
		code: 'AL',
		phoneCode: '+355',
		flagEmoji: '🇦🇱',
	},
	{
		name: 'Algeria',
		code: 'DZ',
		phoneCode: '+213',
		flagEmoji: '🇩🇿',
	},
	{
		name: 'AmericanSamoa',
		code: 'AS',
		phoneCode: '+1684',
		flagEmoji: '🇦🇸',
	},
	{
		name: 'Andorra',
		code: 'AD',
		phoneCode: '+376',
		flagEmoji: '🇦🇩',
	},
	{
		name: 'Angola',
		code: 'AO',
		phoneCode: '+244',
		flagEmoji: '🇦🇴',
	},
	{
		name: 'Anguilla',
		code: 'AI',
		phoneCode: '+1264',
		flagEmoji: '🇦🇮',
	},
	{
		name: 'Antarctica',
		code: 'AQ',
		phoneCode: '+672',
		flagEmoji: '🇦🇶',
	},
	{
		name: 'Antigua and Barbuda',
		code: 'AG',
		phoneCode: '+1268',
		flagEmoji: '🇦🇬',
	},
	{
		name: 'Argentina',
		code: 'AR',
		phoneCode: '+54',
		flagEmoji: '🇦🇷',
	},
	{
		name: 'Armenia',
		code: 'AM',
		phoneCode: '+374',
		flagEmoji: '🇦🇲',
	},
	{
		name: 'Aruba',
		code: 'AW',
		phoneCode: '+297',
		flagEmoji: '🇦🇼',
	},
	{
		name: 'Australia',
		code: 'AU',
		phoneCode: '+61',
		flagEmoji: '🇦🇺',
	},
	{
		name: 'Austria',
		code: 'AT',
		phoneCode: '+43',
		flagEmoji: '🇦🇹',
	},
	{
		name: 'Azerbaijan',
		code: 'AZ',
		phoneCode: '+994',
		flagEmoji: '🇦🇿',
	},
	{
		name: 'Bahamas',
		code: 'BS',
		phoneCode: '+1242',
		flagEmoji: '🇧🇸',
	},
	{
		name: 'Bahrain',
		code: 'BH',
		phoneCode: '+973',
		flagEmoji: '🇧🇭',
	},
	{
		name: 'Bangladesh',
		code: 'BD',
		phoneCode: '+880',
		flagEmoji: '🇧🇩',
	},
	{
		name: 'Barbados',
		code: 'BB',
		phoneCode: '+1246',
		flagEmoji: '🇧🇧',
	},
	{
		name: 'Belarus',
		code: 'BY',
		phoneCode: '+375',
		flagEmoji: '🇧🇾',
	},
	{
		name: 'Belgium',
		code: 'BE',
		phoneCode: '+32',
		flagEmoji: '🇧🇪',
	},
	{
		name: 'Belize',
		code: 'BZ',
		phoneCode: '+501',
		flagEmoji: '🇧🇿',
	},
	{
		name: 'Benin',
		code: 'BJ',
		phoneCode: '+229',
		flagEmoji: '🇧🇯',
	},
	{
		name: 'Bermuda',
		code: 'BM',
		phoneCode: '+1441',
		flagEmoji: '🇧🇲',
	},
	{
		name: 'Bhutan',
		code: 'BT',
		phoneCode: '+975',
		flagEmoji: '🇧🇹',
	},
	{
		name: 'Bolivia, Plurinational State of',
		code: 'BO',
		phoneCode: '+591',
		flagEmoji: '🇧🇴',
	},
	{
		name: 'Bosnia and Herzegovina',
		code: 'BA',
		phoneCode: '+387',
		flagEmoji: '🇧🇦',
	},
	{
		name: 'Botswana',
		code: 'BW',
		phoneCode: '+267',
		flagEmoji: '🇧🇼',
	},
	{
		name: 'Brazil',
		code: 'BR',
		phoneCode: '+55',
		flagEmoji: '🇧🇷',
	},
	{
		name: 'British Indian Ocean Territory',
		code: 'IO',
		phoneCode: '+246',
		flagEmoji: '🇮🇴',
	},
	{
		name: 'Brunei Darussalam',
		code: 'BN',
		phoneCode: '+673',
		flagEmoji: '🇧🇳',
	},
	{
		name: 'Bulgaria',
		code: 'BG',
		phoneCode: '+359',
		flagEmoji: '🇧🇬',
	},
	{
		name: 'Burkina Faso',
		code: 'BF',
		phoneCode: '+226',
		flagEmoji: '🇧🇫',
	},
	{
		name: 'Burundi',
		code: 'BI',
		phoneCode: '+257',
		flagEmoji: '🇧🇮',
	},
	{
		name: 'Cambodia',
		code: 'KH',
		phoneCode: '+855',
		flagEmoji: '🇰🇭',
	},
	{
		name: 'Cameroon',
		code: 'CM',
		phoneCode: '+237',
		flagEmoji: '🇨🇲',
	},
	{
		name: 'Canada',
		code: 'CA',
		phoneCode: '+1',
		flagEmoji: '🇨🇦',
	},
	{
		name: 'Cape Verde',
		code: 'CV',
		phoneCode: '+238',
		flagEmoji: '🇨🇻',
	},
	{
		name: 'Cayman Islands',
		code: 'KY',
		phoneCode: '+345',
		flagEmoji: '🇰🇾',
	},
	{
		name: 'Central African Republic',
		code: 'CF',
		phoneCode: '+236',
		flagEmoji: '🇨🇫',
	},
	{
		name: 'Chad',
		code: 'TD',
		phoneCode: '+235',
		flagEmoji: '🇹🇩',
	},
	{
		name: 'Chile',
		code: 'CL',
		phoneCode: '+56',
		flagEmoji: '🇨🇱',
	},
	{
		name: 'China',
		code: 'CN',
		phoneCode: '+86',
		flagEmoji: '🇨🇳',
	},
	{
		name: 'Christmas Island',
		code: 'CX',
		phoneCode: '+61',
		flagEmoji: '🇨🇽',
	},
	{
		name: 'Cocos (Keeling) Islands',
		code: 'CC',
		phoneCode: '+61',
		flagEmoji: '🇨🇨',
	},
	{
		name: 'Colombia',
		code: 'CO',
		phoneCode: '+57',
		flagEmoji: '🇨🇴',
	},
	{
		name: 'Comoros',
		code: 'KM',
		phoneCode: '+269',
		flagEmoji: '🇰🇲',
	},
	{
		name: 'Congo',
		code: 'CG',
		phoneCode: '+242',
		flagEmoji: '🇨🇬',
	},
	{
		name: 'Congo, The Democratic Republic of the Congo',
		code: 'CD',
		phoneCode: '+243',
		flagEmoji: '🇨🇩',
	},
	{
		name: 'Cook Islands',
		code: 'CK',
		phoneCode: '+682',
		flagEmoji: '🇨🇰',
	},
	{
		name: 'Costa Rica',
		code: 'CR',
		phoneCode: '+506',
		flagEmoji: '🇨🇷',
	},
	{
		name: "Cote d'Ivoire",
		code: 'CI',
		phoneCode: '+225',
		flagEmoji: '🇨🇮',
	},
	{
		name: 'Croatia',
		code: 'HR',
		phoneCode: '+385',
		flagEmoji: '🇭🇷',
	},
	{
		name: 'Cuba',
		code: 'CU',
		phoneCode: '+53',
		flagEmoji: '🇨🇺',
	},
	{
		name: 'Cyprus',
		code: 'CY',
		phoneCode: '+357',
		flagEmoji: '🇨🇾',
	},
	{
		name: 'Czech Republic',
		code: 'CZ',
		phoneCode: '+420',
		flagEmoji: '🇨🇿',
	},
	{
		name: 'Denmark',
		code: 'DK',
		phoneCode: '+45',
		flagEmoji: '🇩🇰',
	},
	{
		name: 'Djibouti',
		code: 'DJ',
		phoneCode: '+253',
		flagEmoji: '🇩🇯',
	},
	{
		name: 'Dominica',
		code: 'DM',
		phoneCode: '+1767',
		flagEmoji: '🇩🇲',
	},
	{
		name: 'Dominican Republic',
		code: 'DO',
		phoneCode: '+1849',
		flagEmoji: '🇩🇴',
	},
	{
		name: 'Ecuador',
		code: 'EC',
		phoneCode: '+593',
		flagEmoji: '🇪🇨',
	},
	{
		name: 'Egypt',
		code: 'EG',
		phoneCode: '+20',
		flagEmoji: '🇪🇬',
	},
	{
		name: 'El Salvador',
		code: 'SV',
		phoneCode: '+503',
		flagEmoji: '🇸🇻',
	},
	{
		name: 'Equatorial Guinea',
		code: 'GQ',
		phoneCode: '+240',
		flagEmoji: '🇬🇶',
	},
	{
		name: 'Eritrea',
		code: 'ER',
		phoneCode: '+291',
		flagEmoji: '🇪🇷',
	},
	{
		name: 'Estonia',
		code: 'EE',
		phoneCode: '+372',
		flagEmoji: '🇪🇪',
	},
	{
		name: 'Ethiopia',
		code: 'ET',
		phoneCode: '+251',
		flagEmoji: '🇪🇹',
	},
	{
		name: 'Falkland Islands (Malvinas)',
		code: 'FK',
		phoneCode: '+500',
		flagEmoji: '🇫🇰',
	},
	{
		name: 'Faroe Islands',
		code: 'FO',
		phoneCode: '+298',
		flagEmoji: '🇫🇴',
	},
	{
		name: 'Fiji',
		code: 'FJ',
		phoneCode: '+679',
		flagEmoji: '🇫🇯',
	},
	{
		name: 'Finland',
		code: 'FI',
		phoneCode: '+358',
		flagEmoji: '🇫🇮',
	},
	{
		name: 'France',
		code: 'FR',
		phoneCode: '+33',
		flagEmoji: '🇫🇷',
	},
	{
		name: 'French Guiana',
		code: 'GF',
		phoneCode: '+594',
		flagEmoji: '🇬🇫',
	},
	{
		name: 'French Polynesia',
		code: 'PF',
		phoneCode: '+689',
		flagEmoji: '🇵🇫',
	},
	{
		name: 'Gabon',
		code: 'GA',
		phoneCode: '+241',
		flagEmoji: '🇬🇦',
	},
	{
		name: 'Gambia',
		code: 'GM',
		phoneCode: '+220',
		flagEmoji: '🇬🇲',
	},
	{
		name: 'Georgia',
		code: 'GE',
		phoneCode: '+995',
		flagEmoji: '🇬🇪',
	},
	{
		name: 'Germany',
		code: 'DE',
		phoneCode: '+49',
		flagEmoji: '🇩🇪',
	},
	{
		name: 'Ghana',
		code: 'GH',
		phoneCode: '+233',
		flagEmoji: '🇬🇭',
	},
	{
		name: 'Gibraltar',
		code: 'GI',
		phoneCode: '+350',
		flagEmoji: '🇬🇮',
	},
	{
		name: 'Greece',
		code: 'GR',
		phoneCode: '+30',
		flagEmoji: '🇬🇷',
	},
	{
		name: 'Greenland',
		code: 'GL',
		phoneCode: '+299',
		flagEmoji: '🇬🇱',
	},
	{
		name: 'Grenada',
		code: 'GD',
		phoneCode: '+1473',
		flagEmoji: '🇬🇩',
	},
	{
		name: 'Guadeloupe',
		code: 'GP',
		phoneCode: '+590',
		flagEmoji: '🇬🇵',
	},
	{
		name: 'Guam',
		code: 'GU',
		phoneCode: '+1671',
		flagEmoji: '🇬🇺',
	},
	{
		name: 'Guatemala',
		code: 'GT',
		phoneCode: '+502',
		flagEmoji: '🇬🇹',
	},
	{
		name: 'Guernsey',
		code: 'GG',
		phoneCode: '+44',
		flagEmoji: '🇬🇬',
	},
	{
		name: 'Guinea',
		code: 'GN',
		phoneCode: '+224',
		flagEmoji: '🇬🇳',
	},
	{
		name: 'Guinea-Bissau',
		code: 'GW',
		phoneCode: '+245',
		flagEmoji: '🇬🇼',
	},
	{
		name: 'Guyana',
		code: 'GY',
		phoneCode: '+595',
		flagEmoji: '🇬🇾',
	},
	{
		name: 'Haiti',
		code: 'HT',
		phoneCode: '+509',
		flagEmoji: '🇭🇹',
	},
	{
		name: 'Holy See (Vatican City State)',
		code: 'VA',
		phoneCode: '+379',
		flagEmoji: '🇻🇦',
	},
	{
		name: 'Honduras',
		code: 'HN',
		phoneCode: '+504',
		flagEmoji: '🇭🇳',
	},
	{
		name: 'Hong Kong',
		code: 'HK',
		phoneCode: '+852',
		flagEmoji: '🇭🇰',
	},
	{
		name: 'Hungary',
		code: 'HU',
		phoneCode: '+36',
		flagEmoji: '🇭🇺',
	},
	{
		name: 'Iceland',
		code: 'IS',
		phoneCode: '+354',
		flagEmoji: '🇮🇸',
	},
	{
		name: 'India',
		code: 'IN',
		phoneCode: '+91',
		flagEmoji: '🇮🇳',
	},
	{
		name: 'Indonesia',
		code: 'ID',
		phoneCode: '+62',
		flagEmoji: '🇮🇩',
	},
	{
		name: 'Iran, Islamic Republic of Persian Gulf',
		code: 'IR',
		phoneCode: '+98',
		flagEmoji: '🇮🇷',
	},
	{
		name: 'Iraq',
		code: 'IQ',
		phoneCode: '+964',
		flagEmoji: '🇮🇷',
	},
	{
		name: 'Ireland',
		code: 'IE',
		phoneCode: '+353',
		flagEmoji: '🇮🇪',
	},
	{
		name: 'Isle of Man',
		code: 'IM',
		phoneCode: '+44',
		flagEmoji: '🇮🇲',
	},
	{
		name: 'Israel',
		code: 'IL',
		phoneCode: '+972',
		flagEmoji: '🇮🇱',
	},
	{
		name: 'Italy',
		code: 'IT',
		phoneCode: '+39',
		flagEmoji: '🇮🇹',
	},
	{
		name: 'Jamaica',
		code: 'JM',
		phoneCode: '+1876',
		flagEmoji: '🇯🇲',
	},
	{
		name: 'Japan',
		code: 'JP',
		phoneCode: '+81',
		flagEmoji: '🇯🇵',
	},
	{
		name: 'Jersey',
		code: 'JE',
		phoneCode: '+44',
		flagEmoji: '🇯🇪',
	},
	{
		name: 'Jordan',
		code: 'JO',
		phoneCode: '+962',
		flagEmoji: '🇯🇴',
	},
	{
		name: 'Kazakhstan',
		code: 'KZ',
		phoneCode: '+77',
		flagEmoji: '🇰🇿',
	},
	{
		name: 'Kenya',
		code: 'KE',
		phoneCode: '+254',
		flagEmoji: '🇰🇪',
	},
	{
		name: 'Kiribati',
		code: 'KI',
		phoneCode: '+686',
		flagEmoji: '🇰🇮',
	},
	{
		name: "Korea, Democratic People's Republic of Korea",
		code: 'KP',
		phoneCode: '+850',
		flagEmoji: '🇰🇵',
	},
	{
		name: 'Korea, Republic of South Korea',
		code: 'KR',
		phoneCode: '+82',
		flagEmoji: '🇰🇷',
	},
	{
		name: 'Kuwait',
		code: 'KW',
		phoneCode: '+965',
		flagEmoji: '🇰🇼',
	},
	{
		name: 'Kyrgyzstan',
		code: 'KG',
		phoneCode: '+996',
		flagEmoji: '🇰🇬',
	},
	{
		name: 'Laos',
		code: 'LA',
		phoneCode: '+856',
		flagEmoji: '🇱🇦',
	},
	{
		name: 'Latvia',
		code: 'LV',
		phoneCode: '+371',
		flagEmoji: '🇱🇻',
	},
	{
		name: 'Lebanon',
		code: 'LB',
		phoneCode: '+961',
		flagEmoji: '🇱🇧',
	},
	{
		name: 'Lesotho',
		code: 'LS',
		phoneCode: '+266',
		flagEmoji: '🇱🇸',
	},
	{
		name: 'Liberia',
		code: 'LR',
		phoneCode: '+231',
		flagEmoji: '🇱🇷',
	},
	{
		name: 'Libyan Arab Jamahiriya',
		code: 'LY',
		phoneCode: '+218',
		flagEmoji: '🇱🇾',
	},
	{
		name: 'Liechtenstein',
		code: 'LI',
		phoneCode: '+423',
		flagEmoji: '🇱🇮',
	},
	{
		name: 'Lithuania',
		code: 'LT',
		phoneCode: '+370',
		flagEmoji: '🇱🇹',
	},
	{
		name: 'Luxembourg',
		code: 'LU',
		phoneCode: '+352',
		flagEmoji: '🇱🇺',
	},
	{
		name: 'Macao',
		code: 'MO',
		phoneCode: '+853',
		flagEmoji: '🇲🇴',
	},
	{
		name: 'Macedonia',
		code: 'MK',
		phoneCode: '+389',
		flagEmoji: '🇲🇰',
	},
	{
		name: 'Madagascar',
		code: 'MG',
		phoneCode: '+261',
		flagEmoji: '🇲🇬',
	},
	{
		name: 'Malawi',
		code: 'MW',
		phoneCode: '+265',
		flagEmoji: '🇲🇼',
	},
	{
		name: 'Malaysia',
		code: 'MY',
		phoneCode: '+60',
		flagEmoji: '🇲🇾',
	},
	{
		name: 'Maldives',
		code: 'MV',
		phoneCode: '+960',
		flagEmoji: '🇲🇻',
	},
	{
		name: 'Mali',
		code: 'ML',
		phoneCode: '+223',
		flagEmoji: '🇲🇱',
	},
	{
		name: 'Malta',
		code: 'MT',
		phoneCode: '+356',
		flagEmoji: '🇲🇹',
	},
	{
		name: 'Marshall Islands',
		code: 'MH',
		phoneCode: '+692',
		flagEmoji: '🇲🇭',
	},
	{
		name: 'Martinique',
		code: 'MQ',
		phoneCode: '+596',
		flagEmoji: '🇲🇶',
	},
	{
		name: 'Mauritania',
		code: 'MR',
		phoneCode: '+222',
		flagEmoji: '🇲🇷',
	},
	{
		name: 'Mauritius',
		code: 'MU',
		phoneCode: '+230',
		flagEmoji: '🇲🇺',
	},
	{
		name: 'Mayotte',
		code: 'YT',
		phoneCode: '+262',
		flagEmoji: '🇾🇹',
	},
	{
		name: 'Mexico',
		code: 'MX',
		phoneCode: '+52',
		flagEmoji: '🇲🇽',
	},
	{
		name: 'Micronesia, Federated States of Micronesia',
		code: 'FM',
		phoneCode: '+691',
		flagEmoji: '🇫🇲',
	},
	{
		name: 'Moldova',
		code: 'MD',
		phoneCode: '+373',
		flagEmoji: '🇲🇩',
	},
	{
		name: 'Monaco',
		code: 'MC',
		phoneCode: '+377',
		flagEmoji: '🇲🇨',
	},
	{
		name: 'Mongolia',
		code: 'MN',
		phoneCode: '+976',
		flagEmoji: '🇲🇳',
	},
	{
		name: 'Montenegro',
		code: 'ME',
		phoneCode: '+382',
		flagEmoji: '🇲🇪',
	},
	{
		name: 'Montserrat',
		code: 'MS',
		phoneCode: '+1664',
		flagEmoji: '🇲🇸',
	},
	{
		name: 'Morocco',
		code: 'MA',
		phoneCode: '+212',
		flagEmoji: '🇲🇦',
	},
	{
		name: 'Mozambique',
		code: 'MZ',
		phoneCode: '+258',
		flagEmoji: '🇲🇿',
	},
	{
		name: 'Myanmar',
		code: 'MM',
		phoneCode: '+95',
		flagEmoji: '🇲🇲',
	},
	{
		name: 'Namibia',
		code: 'NA',
		phoneCode: '+264',
		flagEmoji: '🇳🇦',
	},
	{
		name: 'Nauru',
		code: 'NR',
		phoneCode: '+674',
		flagEmoji: '🇳🇷',
	},
	{
		name: 'Nepal',
		code: 'NP',
		phoneCode: '+977',
		flagEmoji: '🇳🇵',
	},
	{
		name: 'Netherlands',
		code: 'NL',
		phoneCode: '+31',
		flagEmoji: '🇳🇱',
	},
	{
		name: 'Netherlands Antilles',
		code: 'AN',
		phoneCode: '+599',
		flagEmoji: '🇧🇶',
	},
	{
		name: 'New Caledonia',
		code: 'NC',
		phoneCode: '+687',
		flagEmoji: '🇳🇨',
	},
	{
		name: 'New Zealand',
		code: 'NZ',
		phoneCode: '+64',
		flagEmoji: '🇳🇿',
	},
	{
		name: 'Nicaragua',
		code: 'NI',
		phoneCode: '+505',
		flagEmoji: '🇳🇮',
	},
	{
		name: 'Niger',
		code: 'NE',
		phoneCode: '+227',
		flagEmoji: '🇳🇪',
	},
	{
		name: 'Nigeria',
		code: 'NG',
		phoneCode: '+234',
		flagEmoji: '🇳🇬',
	},
	{
		name: 'Niue',
		code: 'NU',
		phoneCode: '+683',
		flagEmoji: '🇳🇺',
	},
	{
		name: 'Norfolk Island',
		code: 'NF',
		phoneCode: '+672',
		flagEmoji: '🇳🇫',
	},
	{
		name: 'Northern Mariana Islands',
		code: 'MP',
		phoneCode: '+1670',
		flagEmoji: '🇲🇵',
	},
	{
		name: 'Norway',
		code: 'NO',
		phoneCode: '+47',
		flagEmoji: '🇳🇴',
	},
	{
		name: 'Oman',
		code: 'OM',
		phoneCode: '+968',
		flagEmoji: '🇴🇲',
	},
	{
		name: 'Pakistan',
		code: 'PK',
		phoneCode: '+92',
		flagEmoji: '🇵🇰',
	},
	{
		name: 'Palau',
		code: 'PW',
		phoneCode: '+680',
		flagEmoji: '🇵🇼',
	},
	{
		name: 'Palestinian Territory, Occupied',
		code: 'PS',
		phoneCode: '+970',
		flagEmoji: '🇵🇸',
	},
	{
		name: 'Panama',
		code: 'PA',
		phoneCode: '+507',
		flagEmoji: '🇵🇦',
	},
	{
		name: 'Papua New Guinea',
		code: 'PG',
		phoneCode: '+675',
		flagEmoji: '🇵🇬',
	},
	{
		name: 'Paraguay',
		code: 'PY',
		phoneCode: '+595',
		flagEmoji: '🇵🇾',
	},
	{
		name: 'Peru',
		code: 'PE',
		phoneCode: '+51',
		flagEmoji: '🇵🇪',
	},
	{
		name: 'Philippines',
		code: 'PH',
		phoneCode: '+63',
		flagEmoji: '🇵🇭',
	},
	{
		name: 'Pitcairn',
		code: 'PN',
		phoneCode: '+872',
		flagEmoji: '🇵🇳',
	},
	{
		name: 'Poland',
		code: 'PL',
		phoneCode: '+48',
		flagEmoji: '🇵🇱',
	},
	{
		name: 'Portugal',
		code: 'PT',
		phoneCode: '+351',
		flagEmoji: '🇵🇹',
	},
	{
		name: 'Puerto Rico',
		code: 'PR',
		phoneCode: '+1939',
		flagEmoji: '🇵🇷',
	},
	{
		name: 'Qatar',
		code: 'QA',
		phoneCode: '+974',
		flagEmoji: '🇶🇦',
	},
	{
		name: 'Reunion',
		code: 'RE',
		phoneCode: '+262',
		flagEmoji: '🇷🇪',
	},
	{
		name: 'Romania',
		code: 'RO',
		phoneCode: '+40',
		flagEmoji: '🇷🇴',
	},
	{
		name: 'Russia',
		code: 'RU',
		phoneCode: '+7',
		flagEmoji: '🇷🇺',
	},
	{
		name: 'Rwanda',
		code: 'RW',
		phoneCode: '+250',
		flagEmoji: '🇷🇼',
	},
	{
		name: 'Saint Barthelemy',
		code: 'BL',
		phoneCode: '+590',
		flagEmoji: '🇧🇱',
	},
	{
		name: 'Saint Helena, Ascension and Tristan Da Cunha',
		code: 'SH',
		phoneCode: '+290',
		flagEmoji: '🇸🇭',
	},
	{
		name: 'Saint Kitts and Nevis',
		code: 'KN',
		phoneCode: '+1869',
		flagEmoji: '🇰🇳',
	},
	{
		name: 'Saint Lucia',
		code: 'LC',
		phoneCode: '+1758',
		flagEmoji: '🇱🇨',
	},
	{
		name: 'Saint Martin',
		code: 'MF',
		phoneCode: '+590',
		flagEmoji: '🇲🇫',
	},
	{
		name: 'Saint Pierre and Miquelon',
		code: 'PM',
		phoneCode: '+508',
		flagEmoji: '🇵🇲',
	},
	{
		name: 'Saint Vincent and the Grenadines',
		code: 'VC',
		phoneCode: '+1784',
		flagEmoji: '🇻🇨',
	},
	{
		name: 'Samoa',
		code: 'WS',
		phoneCode: '+685',
		flagEmoji: '🇼🇸',
	},
	{
		name: 'San Marino',
		code: 'SM',
		phoneCode: '+378',
		flagEmoji: '🇸🇲',
	},
	{
		name: 'Sao Tome and Principe',
		code: 'ST',
		phoneCode: '+239',
		flagEmoji: '🇸🇹',
	},
	{
		name: 'Saudi Arabia',
		code: 'SA',
		phoneCode: '+966',
		flagEmoji: '🇸🇦',
	},
	{
		name: 'Senegal',
		code: 'SN',
		phoneCode: '+221',
		flagEmoji: '🇸🇳',
	},
	{
		name: 'Serbia',
		code: 'RS',
		phoneCode: '+381',
		flagEmoji: '🇷🇸',
	},
	{
		name: 'Seychelles',
		code: 'SC',
		phoneCode: '+248',
		flagEmoji: '🇸🇨',
	},
	{
		name: 'Sierra Leone',
		code: 'SL',
		phoneCode: '+232',
		flagEmoji: '🇸🇱',
	},
	{
		name: 'Singapore',
		code: 'SG',
		phoneCode: '+65',
		flagEmoji: '🇸🇬',
	},
	{
		name: 'Slovakia',
		code: 'SK',
		phoneCode: '+421',
		flagEmoji: '🇸🇰',
	},
	{
		name: 'Slovenia',
		code: 'SI',
		phoneCode: '+386',
		flagEmoji: '🇸🇮',
	},
	{
		name: 'Solomon Islands',
		code: 'SB',
		phoneCode: '+677',
		flagEmoji: '🇸🇧',
	},
	{
		name: 'Somalia',
		code: 'SO',
		phoneCode: '+252',
		flagEmoji: '🇸🇴',
	},
	{
		name: 'South Africa',
		code: 'ZA',
		phoneCode: '+27',
		flagEmoji: '🇿🇦',
	},
	{
		name: 'South Georgia and the South Sandwich Islands',
		code: 'GS',
		phoneCode: '+500',
		flagEmoji: '🇬🇸',
	},
	{
		name: 'South Sudan',
		code: 'SS',
		phoneCode: '+211',
		flagEmoji: '🇸🇸',
	},
	{
		name: 'Spain',
		code: 'ES',
		phoneCode: '+34',
		flagEmoji: '🇪🇸',
	},
	{
		name: 'Sri Lanka',
		code: 'LK',
		phoneCode: '+94',
		flagEmoji: '🇱🇰',
	},
	{
		name: 'Sudan',
		code: 'SD',
		phoneCode: '+249',
		flagEmoji: '🇸🇩',
	},
	{
		name: 'Suriname',
		code: 'SR',
		phoneCode: '+597',
		flagEmoji: '🇸🇷',
	},
	{
		name: 'Svalbard and Jan Mayen',
		code: 'SJ',
		phoneCode: '+47',
		flagEmoji: '🇸🇯',
	},
	{
		name: 'Swaziland',
		code: 'SZ',
		phoneCode: '+268',
		flagEmoji: '🇸🇿',
	},
	{
		name: 'Sweden',
		code: 'SE',
		phoneCode: '+46',
		flagEmoji: '🇸🇪',
	},
	{
		name: 'Switzerland',
		code: 'CH',
		phoneCode: '+41',
		flagEmoji: '🇨🇭',
	},
	{
		name: 'Syrian Arab Republic',
		code: 'SY',
		phoneCode: '+963',
		flagEmoji: '🇸🇾',
	},
	{
		name: 'Taiwan',
		code: 'TW',
		phoneCode: '+886',
		flagEmoji: '🇹🇼',
	},
	{
		name: 'Tajikistan',
		code: 'TJ',
		phoneCode: '+992',
		flagEmoji: '🇹🇯',
	},
	{
		name: 'Tanzania, United Republic of Tanzania',
		code: 'TZ',
		phoneCode: '+255',
		flagEmoji: '🇹🇿',
	},
	{
		name: 'Thailand',
		code: 'TH',
		phoneCode: '+66',
		flagEmoji: '🇹🇭',
	},
	{
		name: 'Timor-Leste',
		code: 'TL',
		phoneCode: '+670',
		flagEmoji: '🇹🇱',
	},
	{
		name: 'Togo',
		code: 'TG',
		phoneCode: '+228',
		flagEmoji: '🇹🇬',
	},
	{
		name: 'Tokelau',
		code: 'TK',
		phoneCode: '+690',
		flagEmoji: '🇹🇰',
	},
	{
		name: 'Tonga',
		code: 'TO',
		phoneCode: '+676',
		flagEmoji: '🇹🇴',
	},
	{
		name: 'Trinidad and Tobago',
		code: 'TT',
		phoneCode: '+1868',
		flagEmoji: '🇹🇹',
	},
	{
		name: 'Tunisia',
		code: 'TN',
		phoneCode: '+216',
		flagEmoji: '🇹🇳',
	},
	{
		name: 'Turkey',
		code: 'TR',
		phoneCode: '+90',
		flagEmoji: '🇹🇷',
	},
	{
		name: 'Turkmenistan',
		code: 'TM',
		phoneCode: '+993',
		flagEmoji: '🇹🇲',
	},
	{
		name: 'Turks and Caicos Islands',
		code: 'TC',
		phoneCode: '+1649',
		flagEmoji: '🇹🇨',
	},
	{
		name: 'Tuvalu',
		code: 'TV',
		phoneCode: '+688',
		flagEmoji: '🇹🇻',
	},
	{
		name: 'Uganda',
		code: 'UG',
		phoneCode: '+256',
		flagEmoji: '🇺🇬',
	},
	{
		name: 'Ukraine',
		code: 'UA',
		phoneCode: '+380',
		flagEmoji: '🇺🇦',
	},
	{
		name: 'United Arab Emirates',
		code: 'AE',
		phoneCode: '+971',
		flagEmoji: '🇦🇪',
	},
	{
		name: 'United Kingdom',
		code: 'GB',
		phoneCode: '+44',
		flagEmoji: '🇬🇧',
	},
	{
		name: 'United States',
		code: 'US',
		phoneCode: '+1',
		flagEmoji: '🇺🇸',
	},
	{
		name: 'Uruguay',
		code: 'UY',
		phoneCode: '+598',
		flagEmoji: '🇺🇾',
	},
	{
		name: 'Uzbekistan',
		code: 'UZ',
		phoneCode: '+998',
		flagEmoji: '🇺🇿',
	},
	{
		name: 'Vanuatu',
		code: 'VU',
		phoneCode: '+678',
		flagEmoji: '🇻🇺',
	},
	{
		name: 'Venezuela, Bolivarian Republic of Venezuela',
		code: 'VE',
		phoneCode: '+58',
		flagEmoji: '🇻🇪',
	},
	{
		name: 'Vietnam',
		code: 'VN',
		phoneCode: '+84',
		flagEmoji: '🇻🇳',
	},
	{
		name: 'Virgin Islands, British',
		code: 'VG',
		phoneCode: '+1284',
		flagEmoji: '🇻🇬',
	},
	{
		name: 'Virgin Islands, U.S.',
		code: 'VI',
		phoneCode: '+1340',
		flagEmoji: '🇻🇮',
	},
	{
		name: 'Wallis and Futuna',
		code: 'WF',
		phoneCode: '+681',
		flagEmoji: '🇼🇫',
	},
	{
		name: 'Yemen',
		code: 'YE',
		phoneCode: '+967',
		flagEmoji: '🇾🇪',
	},
	{
		name: 'Zambia',
		code: 'ZM',
		phoneCode: '+260',
		flagEmoji: '🇿🇲',
	},
	{
		name: 'Zimbabwe',
		code: 'ZW',
		phoneCode: '+263',
		flagEmoji: '🇿🇼',
	},
];
