//https://www.apollographql.com/docs/react/development-testing/static-typing/
//https://github.com/dotansimha/graphql-code-generator/issues/1757#issuecomment-1436039415

/* eslint-disable no-process-env */
import { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnvConfig } from '@next/env';

// @ts-ignore
loadEnvConfig(process.cwd());

const config: CodegenConfig = {
	schema: process.env.NEXT_PUBLIC_GQL_SERVER,
	// this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
	documents: ['src/**/*.{ts,tsx}'],
	generates: {
		'./src/graphql/__generated__/': {
			preset: 'client',
			plugins: [],
			presetConfig: {
				gqlTagName: 'gql'
			}
		}
	},
	ignoreNoDocuments: true
};

export default config;
