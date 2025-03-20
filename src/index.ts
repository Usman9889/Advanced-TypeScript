// recap
interface User {
      name:string,
      age: number
}

function sumOfAge(user1:User, user2:User){
      return user1.age + user2.age
}

const result = sumOfAge({
      name: "usman",
      age:21
},{
      name: " mohd",
      age: 20
})

// console.log(result);

// 1] Pick

// The `Pick` utility type in TypeScript is a powerful feature that allows you to construct new types by selecting a subset of properties from an existing type or interface.

// 2] Partial

// The `Partial` utility type in TypeScript is used to create a new type by making all properties of an existing type optional. This is particularly useful when you want to update a subset of an object's properties without needing to provide the entire object.

interface User1 {
      id: string;
      name: string;
      age: number;
      address: string;
      phoneNumber: string;
      email: string;
      password: string;
}

type updateProps = Pick<User1, "name" | "age" | "email">  //Pick
 
type updatePropOptional = Partial<updateProps>  //Partial

function updatedProps(updatedProps:updatePropOptional){
      // hit the database to update the user
}

updatedProps({
      name: "usman" 
})

// # 3] Readonly

// The `Readonly` utility type in TypeScript is used to make all properties of a given type read-only. This means that once an object of this type is created, its properties cannot be reassigned.

interface Config {
      endpoint: string;  //or readonly endpoint: string
      apiKey: string;
    }

const config: Readonly<Config> = {
      endpoint: '<https://api.example.com>',
      apiKey: 'abcdef123456',
    };
    
    // Attempting to modify the object will result in a TypeScript error


//   # 4] Record

// The `Record<K, T>` utility type is used to construct a type with a set of properties `K` of a given type `T`. It provides a cleaner and more concise syntax for typing objects when you know the shape of the values but not the keys in advance.

interface User2 {
      id: string;
      name: string;
    }
    
    // Using Record to type an object with string keys and User values
    type Users = Record<string, User2>;
    
    const users: Users = {
      'abc123': { id: 'abc123', name: 'John Doe' },
      'xyz789': { id: 'xyz789', name: 'Jane Doe' },
    };
    
    console.log(users['abc123']); // Output: { id: 'abc123', name: 'John Doe' }

//     # 5] Map

// The `Map` object in TypeScript (inherited from JavaScript) represents a collection of key-value pairs where both the keys and values can be of any type. Maps remember the original insertion order of the keys, which is a significant difference from plain JavaScript objects.

interface User3 {
      id: string;
      name: string;
    }
    
    // Initialize an empty Map with string keys and User values
    const usersMap = new Map<string, User3>();
    
    // Add users to the map using .set
    usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
    usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });
    
    // Accessing a value using .get
    console.log(usersMap.get('abc123')); // Output: { id: 'abc123', name: 'John Doe' }

//     5] Exclude

// The `Exclude<T, U>` utility type takes two arguments:
// - `T`: The original union type from which you want to exclude some members.
// - `U`: The union type containing the members you want to exclude from `T`.

// The result is a type that includes all members of `T` that are not assignable to `U`.
type EventType = 'click' | 'scroll' | 'mousemove';
// Using Exclude to create a new type without 'scroll'
type ExcludeEvent = Exclude<EventType, 'scroll'>; // 'click' | 'mousemove'

// Function that accepts only 'click' and 'mousemove' events
const handleEvent = (event: ExcludeEvent) => {
  console.log(`Handling event: ${event}`);
};

handleEvent('click'); // OK
// handleEvent('scroll'); // Error: Argument of type '"scroll"' is not assignable to parameter of type 'ExcludeEvent'.