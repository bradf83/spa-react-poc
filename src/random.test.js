// Some random tests for trying some things and learning/improving a few javascript concepts.

it('when creating a hash', () =>{
    let hash = {
        code: 'some_code',
        name: 'some_name'
    };

    expect(hash.code).toEqual('some_code');
    expect(hash.name).toEqual('some_name');
});

it('when copying a hash using the spread operator', () =>{
    let hash = {
        code: 'some_code',
        name: 'some_name',
        deepObject: {
            value: 'deep'
        }
    };

    expect(hash.code).toEqual('some_code');
    expect(hash.name).toEqual('some_name');
    expect(hash.deepObject.value).toEqual('deep');

    // Does a SHALLOW copy of the hash into the new hash.
    let copiedHash = {...hash};

    expect(copiedHash.code).toEqual('some_code');
    expect(copiedHash.name).toEqual('some_name');
    expect(copiedHash.deepObject.value).toEqual('deep');

    // Now lets change the value of deepObject and see what happens
    copiedHash.deepObject.value = 'New Deep Value';

    // Notice these expectations expect that both hashes deepObject value has changed.  This is because the spread operator
    // only does a shallow copy, anything other than is copied by reference.
    expect(hash.deepObject.value).toEqual('New Deep Value');
    expect(copiedHash.deepObject.value).toEqual('New Deep Value');
});

it('when destructing an array', () => {
    let myArray = [1,2,3];
    let [one, two] = myArray;

    expect(one).toEqual(1);
    expect(two).toEqual(2);
});

// Group an array by a property of elements in the array.
const groupBy = (xs, key) => {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

// Idea for handling form errors in a better way.
const addErrorsToForm = (params, errors) => {
    // Group errors by property
    let grouped = groupBy(errors, 'property');

    // Assign errors to params
    let newParams = {
        code: {...params.code, errors: grouped.code},
        name: {...params.name, errors: grouped.name}
    };
    console.log('New Params', newParams);

    // return new params
    return newParams;
};

it('when simulating a form submit with errors.', () =>{
    let params = {
        code: {value: 'code'},
        name: {name: 'name'}
    };

    // Props: entity, property, invalidValue, message
    let errors = [
        {entity: 'company', property: 'code', invalidValue: '', message: 'Some message'},
        {entity: 'company', property: 'code', invalidValue: '', message: 'Some message 2'},
        {entity: 'company', property: 'name', invalidValue: '', message: 'Some message'},
    ];

    let grouped = groupBy(errors, 'property');

    console.log(params);
    console.log(errors);
    console.log(grouped);

    let newState = addErrorsToForm(params, errors);

    console.log(params);
    console.log(newState);

});