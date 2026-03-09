import { TAILWINDCSS_PRESET } from "@newfold/ui-component-library";

module.exports = {
    presets: [TAILWINDCSS_PRESET],
    content: [
        // Include all JS files inside the UI library in your content.
        ...TAILWINDCSS_PRESET.content,
        "./src/**/*.js", // all source files
        './inc/Widgets/views/*.php', // widget view files
		"./node_modules/@newfold/wp-module-*/build/index.js", // all npmjs sourced module builds
        "./node_modules/@newfold-labs/wp-module-*/build/index.js", // all github npm sourced module builds
        "./vendor/newfold-labs/wp-module-*/components/**/*.js", // all composer sourced module components
        './vendor/newfold-labs/wp-module-*/{src,build}/**/*.js', // js components which are not in the /components 
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#548224",
                    50: "#F3FAEC",
					100: "#DBEFC6",
					200: "#C3E59F",
					300: "#ABDA79",
					400: "#7BBE34",
					500: "#507B22",
					600: "#49711F",
					700: "#3D5E1A",
					800: "#375517",
					900: "#1F2F0D",
                    dark: "#44691D",
                    light: "#D3F0B5",
                    lighter: "#E6F6D6",
                },
                secondary: {
                    DEFAULT: "#576164",
                    dark: "#4F595C",
                    light: "#949C9E",
                    lighter: "#C7CCCF",
                },
                title: "#484848",
                body: "#4F595C",
                link: "#00A1EF",
                line: "#E2E8F0",
                white: "#FFFFFF",
                offWhite: "#F5F6F8",
                black: "#000000",
                canvas: "#F5F6F8",
            },
        },
    },
    plugins: [],
}
