export const bestGirls = [
	{
		name: 'Кристиночка',
		age: 28,
		city: 'Санкт-Петербург, Россия',
		like: 12,
		img: '/images/best-girls/bg1.png',
	},
	{
		name: 'Диана',
		age: 20,
		city: 'Санкт-Петербург, Россия',
		like: 3,
		img: '/images/best-girls/bg2.png',
	},
	{
		name: 'Аня',
		age: 18,
		city: 'Ростов-на-Дону, Россия',
		like: 145,
		img: '/images/best-girls/bg3.png',
	},
	{
		name: 'Анжелика',
		age: 27,
		city: 'Чебоксары, Россия',
		like: 17,
		img: '/images/best-girls/bg4.png',
	},
	{
		name: 'Лариса',
		age: 32,
		city: 'Москва, Россия',
		like: 12,
		img: '/images/best-girls/bg5.png',
	},
	{
		name: 'Настя',
		age: 21,
		city: 'Зеленоград, Россия',
		like: 3,
		img: '/images/best-girls/bg6.png',
	},
	{
		name: 'Евгения',
		age: 30,
		city: 'Ростов-на-Дону, Россия',
		like: 4,
		img: '/images/best-girls/bg7.png',
	},
	{
		name: 'Ольга',
		age: 25,
		city: 'Казань, Россия',
		like: 28,
		img: '/images/best-girls/bg8.png',
	},
];

export const markup = `
	${bestGirls.map(girl => `
		<div class="best-girls__item">

			<div class="best-girls__item-img" style="background-image: url('${girl.img}')">

				<div class="badge badge-like">
					<i class="icon-camera"></i>${girl.like}
				</div>

				<div class="badge badge-top">
					ТОП
				</div>

			</div>

			<div class="best-girls__item-button row">

				<button type="button" id="favor" class="btn btn-fav">
					<i class="icon-star-empty"></i>
					<span>Избранное</span>
				</button>
				<button type="button" class="btn btn-chat">
					<i class="icon-mail-1"></i>
					<span>Написать</span>
				</button>

			</div>

			<div class="best-girls__item-footer">

				<span class="girl-name girl-online">${girl.name},  ${girl.age}</span>
				<span class="girl-city">${girl.city}</span>

			</div>

		</div>
	`).join('')}
`;
