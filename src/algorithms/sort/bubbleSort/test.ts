// @ts-ignore
import basicJs from "./basic";
import basicTs from "./stringSort";
import templated from "./genericSort";
import monitored from "./monitoredSort";

[
  { name: "Basic JavaScript", sort: basicJs },
  { name: "Basic TypeScript", sort: basicTs },
  { name: "Templated TypeScript", sort: templated },
  { name: "Monitored TypeScript", sort: monitored },
].forEach(({ name, sort }) => {
  // Create a test for each algorithm
  test(`Bubble Sort - Strings (${name}):`, () => {
    const names: string[] = [
      "Lister",
      "Cat",
      "Kryten",
      "Rimmer",
      "Holly",
      "Kochanski",
    ];

    const sortedNames: string[] = sort(names);

    expect(sortedNames).toStrictEqual([
      "Cat",
      "Holly",
      "Kochanski",
      "Kryten",
      "Lister",
      "Rimmer",
    ]);
  });
});
