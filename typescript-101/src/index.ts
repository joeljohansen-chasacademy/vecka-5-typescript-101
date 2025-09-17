function greet(name: string): void {
	//name.toUpperCase();
	console.log("Hello, ", name);
	//return "Hello, " + name;
}
greet("Joel");

function greetPerson(name: unknown) {
	if (typeof name === "string") {
		name.toUpperCase();
	}
}

//Interface

interface Person {
	name: string;
	age: number;
	job?: string;
}

interface Employee extends Person {
	salary: number;
}

interface NameLessPerson extends Omit<Person, "name"> {}

const nameLessPerson: NameLessPerson = {
	age: 23,
};

const onePerson: Employee = {
	name: "Joel",
	age: 35,
	salary: 10000,
};

//Type

type Animal = {
	name: string;
	age: number;
	numberOfLegs?: number;
};

type Bird = Omit<Animal, "numberOfLegs"> & { numberOfWings: number };
type Fish = Pick<Animal, "name"> & { numberOfFins: number };

type OptionalAnimal = Partial<Animal>;
type NonOptionalAnimal = Required<Animal>;

const updatedAnimal: OptionalAnimal = {
	name: "Joel",
};

const anyAnimal: Animal = {
	name: "Joel",
	age: 24,
	numberOfLegs: 2,
};

const anyBird: Bird = {
	name: "Joel",
	age: 24,
	numberOfWings: 2,
};

//Unions

type StringOrNumber = string | number;

function greetNameOrId(nameOrId: StringOrNumber) {
	if (typeof nameOrId === "string") {
		return nameOrId.toUpperCase();
	} else {
		//Hämta namn någonstans ifrån och returnera namnet utifrån ID
		return nameOrId.toExponential();
	}
}

type ApiOK = { ok: true; data: string };
type ApiErr = { ok: false; error: string };
type ApiResponse = ApiOK | ApiErr;

function handleResponse(res: ApiResponse) {
	if (res.ok) {
		console.log(res.data);
	} else {
		console.log(res.error);
	}
}

// Generics

function identity<T>(value: T): T {
	return value;
}

const result = identity<number>(123);
result.toExponential();
const stringResult = identity<string>("hej");
stringResult.toUpperCase();

function identityAsAny(value: any) {
	return value;
}

const resultAsAny = identityAsAny("123");
resultAsAny.toExponential();
