import React,{ useState } from 'react';
import {Container, Form, FormGroup, Input, Label} from "reactstrap";
import FormText from "reactstrap/es/FormText";

// Field
// Name, Type, Nullable, Default
// Belongs To Object
// Has Many List<Object>
// Auditable

const CodeGenerator = () => {
    //TODO: Remember to blank out default data.
    const [model, setModel] = useState("Company");
    const [modelPlural, setModelPlural] = useState("companies");
    const [modelForm, setModelForm] = useState({});
    const [formState, setFormState] = useState({type: 'BigDecimal', nullable: 'true'});
    const [fields, setFields] = useState([
        {fieldName: 'fieldOne', type: 'int', nullable: 'true'},
        {fieldName: 'fieldTwo', type: 'String', nullable: 'true'}
        ]);
    const [createTable, setCreateTable] = useState("");
    const [createModel, setCreateModel] = useState("");
    const [createProcessor, setCreateProcessor] = useState("");
    const [createRepository, setCreateRepository] = useState("");
    const [createTest, setCreateTest] = useState("");


    const handleCreateModel = () => {
        setModel(modelForm.modelName);
        setModelPlural(modelForm.modelPluralName);
    };

    const handleChange = ({target}) => {
        let newState = {...formState};
        newState[target.name] = target.value;
        setFormState(newState);
    };

    const handleModelChange = ({target}) => {
        let newState = {...modelForm};
        newState[target.name] = target.value;
        setModelForm(newState);
    };

    const handleCreateField = () => {
        let errors = [];

        const existing = fields.filter(field => field.fieldName === formState.fieldName);
        if(existing.length > 0){
            errors.push('A field with this name already exists!');
        }

        if(formState.fieldName === undefined || formState.fieldname === ''){
            errors.push('You must supply a field name!');
        }

        if(formState.type === undefined || formState.type === ''){
            errors.push('A field must have a type!');
        }

        if(errors.length > 0){
            alert(errors.join('\n'));
        } else {
            const newArray = fields.slice();
            newArray.push({...formState});
            setFields(newArray);
        }
    };

    const handleGenerate = () => {
        generateTable();
        generateModel();
        generateProcessors();
        generateRepository();
        generateTestClass();
    };

    const generateTable = () => {
      // Table name
      // Fields
      // Engine (Maria)
        let create = '';

        create += 'CREATE TABLE ' + model + ' (\n';
        fields.forEach((field, index) => {
            create += '\t' + field.fieldName + ' ' + field.type;
            if(index !== fields.length - 1){
                create += ','
            }
            create += "\n";
        });
        create += ");";
        setCreateTable(create);
    };

    const generateModel = () => {

        let modelCode = '';

        modelCode += '@Entity\n';
        modelCode += '@NoArgsConstructor\n';
        modelCode += '@Getter\n';
        modelCode += '@Setter\n';
        modelCode += 'public class ' + model + ' extends CommonProperties {\n';
        fields.forEach((field, index) => {
            modelCode += '\tprivate ' + field.type + ' ' + field.fieldName + ';\n';
        });
        modelCode += '}';
        setCreateModel(modelCode);

        // Imports
        // Annotations (Entity, Lombok)
        // Class Def (Extends)
        // Id Field Default
        // Fields
        // Relationships
    };

    const generateProcessors = () => {
        let processor = '';

        processor += '@RequiredArgsConstructor\n';
        processor += '@Component\n';
        processor += 'public class ' + model + 'Processor implements ResourceProcessor<Resource<' + model + '>> {\n';
        processor += '\tprivate final RepositoryEntityLinks repositoryEntityLinks;';
        processor += '\n\n';
        processor += '\t@Override\n';
        processor += '\tpublic Resource<' + model + '> process(Resource<' + model + '> resource) {\n';
        //TODO: Add links here
        //         companyResource.add(repositoryEntityLinks.linkForSingleResource(OwnerRepository.class, companyResource.getContent().getOwner().getId()).withRel("ownerLink"));
        processor += '\t\treturn resource;\n';
        processor += '\t}\n';
        processor += '}';

        // Additional links for belongsTo
        setCreateProcessor(processor);
    };

    const generateRepository = () => {
        let repo = '';

        repo += '@RepositoryRestResource(collectionResourceRel = "' + modelPlural + '", path = "' + modelPlural + '")\n';
        repo += 'public interface CompanyRepository extends PagingAndSortingRepository<' + model + ', Long> {\n\n';
        repo += '}';

        // Imports
        // Annotation
        // Interface Definition
        setCreateRepository(repo);
    };

    const generateTestClass = () => {
        // Controller Test
        setCreateTest("D");
    };

    return (

        <Container>
            <h3>Code Generator</h3>
            <div className="alert alert-info">
                <p>This is a work in progress. This will be a code generator for a common pattern I use on my Spring Boot
                API side.  This is being hacked together really quick, yes this could be built better and more modular.
                </p>
            </div>
        {/*  -- Left To Generate  */}

            {(model === undefined || model === '') &&
                <div>
                    <FormGroup>
                        <Label for="modelName">Model Name</Label>
                        <Input type="text" name="modelName" id="modelName" placeholder="Model Name" onChange={handleModelChange}/>
                        <FormText>Enter the name for your model/table and then press enter.</FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="modelPluralName">Model Plural Name</Label>
                        <Input type="text" name="modelPluralName" id="modelPluralName" placeholder="Model Plural Name" onChange={handleModelChange}/>
                        <FormText>Enter the name for your model/table and then press enter.</FormText>
                    </FormGroup>
                    <button className="btn btn-primary" type="button" onClick={handleCreateModel}>Create Model</button>
                </div>
            }

        {/*  -- Generated So Far  */}

            {model !== undefined && model !== '' &&
                <div>
                    <Form>
                        <FormGroup>
                            <Label for="fieldName">Field Name</Label>
                            <Input type="text" name="fieldName" id="fieldName" onChange={handleChange} placeholder="Field Name"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="type">Type</Label>
                            <Input type="select" name="type" id="type" onChange={handleChange}>
                                <option value="BigDecimal">Big Decimal</option>
                                <option value="boolean">boolean</option>
                                <option value="Boolean">Boolean</option>
                                <option value="int">int</option>
                                <option value="Integer">Integer</option>
                                <option value="long">long</option>
                                <option value="Long">Long</option>
                                <option value="String">String</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="nullable">Nullable?</Label>
                            <Input type="select" name="nullable" id="nullable" onChange={handleChange}>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="default">Default</Label>
                            <Input type="text" name="default" id="default" onChange={handleChange} placeholder="Default"/>
                        </FormGroup>
                        <button className="btn btn-primary mr-2" type="button" onClick={handleCreateField}>Add Field</button>
                        <button className="btn btn-secondary" type="button" onClick={handleGenerate}>Generate!</button>
                    </Form>
                    <ul>
                        <li>Creating model: {model}({modelPlural})</li>
                        {fields.length > 0 && fields.map(field =>
                        <li key={field.fieldName}>{`${field.fieldName} ${field.type} ${field.nullable} ${field.default}`}</li>
                        )}
                    </ul>
                </div>
            }

            {createTable !== undefined && createTable !== '' &&
                <div>
                    <h3>Create Table</h3>
                    <pre>
                        {createTable}
                    </pre>
                </div>
            }

            {createModel !== undefined && createModel !== '' &&
            <div>
                <h3>Create Model</h3>
                <pre>
                        {createModel}
                    </pre>
            </div>
            }

            {createProcessor !== undefined && createProcessor !== '' &&
            <div>
                <h3>Create Processor</h3>
                <pre>
                        {createProcessor}
                    </pre>
            </div>
            }

            {createRepository !== undefined && createRepository !== '' &&
            <div>
                <h3>Create Repository</h3>
                <pre>
                        {createRepository}
                    </pre>
            </div>
            }

            {createTest !== undefined && createTest !== '' &&
            <div>
                <h3>Create Test</h3>
                <pre>
                        {createTest}
                    </pre>
            </div>
            }


        </Container>
    )
};

export default CodeGenerator;