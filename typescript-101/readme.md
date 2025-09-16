# Kom igång

1. kör npm init -y
2. kör npm i typescript
3. skapa tsconfig (eller kör npx tsc --init)

```json
{
	"compilerOptions": {
		"target": "ES2022",
		"module": "ESNext",
		"moduleResolution": "node",
		"outDir": "./dist",
		"strict": true,
		"esModuleInterop": true
	},
	"include": ["src/**/*"],
	"exclude": ["node_modules"]
}
```

4. installera tsx med npm i tsx
5. lägg till i package.json

```json
 "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx src/index.ts"
  }
```
