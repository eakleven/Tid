import { createTheme } from '@shopify/restyle'

const palette = {
	primary: '#1f61a4',
	tertiary: '#1c78a4',

	quaternary: '#142850',
	secondary: '#27496D',

	black: '#0B0B0B',
	lightBlack: '#1F1F1F',
	white: '#FFFF',
	gray: '#8D9A9E',

	danger: '#DC2626',
	warning: '#FBBF24',
}

const theme = createTheme({
	colors: {
		bg1: palette.white,
		bg2: palette.primary,

		bg3: palette.tertiary,
		bg4: palette.quaternary,

		text1: palette.black,
		text2: palette.white,

		danger: palette.danger,
		warning: palette.warning,
	},
	spacing: {
		s: 8,
		m: 16,
		l: 24,
		xl: 40,
	},
	breakpoints: {
		phone: 0,
		tablet: 768,
	},
	textVariants: {
		h1: {
			fontSize: 20,
			lineHeight: 24,
		},
		h2: {
			fontSize: 18,
			lineHeight: 20,
		},
		h3: {
			fontSize: 16,
			lineHeight: 18,
		},
		body: {
			fontSize: 14,
			lineHeight: 16,
		},
	},
})

export type Theme = typeof theme
export type RestyleColor = keyof Theme['colors']
export type RestyleTxtVariant = keyof Theme['textVariants']
export type RestyleSpacing = keyof Theme['spacing']

export default theme
