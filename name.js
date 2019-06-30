const obj = {
    man: "mohammed",
    age: 12,
    father: "mohammed"
};
const keys = Object.keys(obj);

for (let property of keys) {
    if (obj[property] == "mohammed") console.log(property);
}
