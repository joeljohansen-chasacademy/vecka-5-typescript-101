type StringOrNumberExample = string | number;

function toLabel(x: StringOrNumberExample): string {
	if (typeof x === "string") return x.toUpperCase();
	return x.toFixed();
}

type LoadState =
	| { status: "idle" }
	| { status: "loading" }
	| { status: "success"; data: number[] }
	| { status: "error"; message: string }
	| { status: "waiting"; message: string };

function assertNever(x: never): never {
	throw new Error("Unexpected loadstate variant");
}

function render(state: LoadState) {
	switch (state.status) {
		case "idle":
			return "idle..";
		case "loading":
			return `Loadstate`;
		case "success":
			return `Sucess, got data ${state.data}`;
		case "error":
			return `Error: ${state.message}`;
		case "waiting":
			return `Error: ${state.message}`;
		default:
			return assertNever(state);
	}
}

render({ status: "waiting", message: "Waiting to connect" });

type User = {
	id: string;
	name: string;
	lastName: string;
} & (
	| { role: "admin"; adminPassword: string }
	| { role: "user" }
	| { role: "super-admin"; superAdminPassword: string }
);

function getUserId(user: User) {
	if (user.role === "admin") {
		user.adminPassword;
	}
}
