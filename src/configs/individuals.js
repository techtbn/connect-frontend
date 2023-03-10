import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({ allErrors: true, useDefaults: true, $data: true });
ajv.addKeyword('uniforms');

const schema = {
  title: 'Guest',
  type: 'object',
  properties: {
    fullname: { type: 'string' },
    email: { type: 'string' },
    confirmEmail: { type: 'string', const: { $data: '1/email' } },
    password: {
      type: 'string',
      uniforms: { type: 'password' }
    },
    confirmPassword: {
      type: 'string',
      const: { $data: '1/password' },
      uniforms: { type: 'password' }
    },
    acceptTermsOfUse: { type: 'boolean', const: true }
  },
  required: [
    'fullname',
    'email',
    'confirmEmail',
    'password',
    'confirmPassword',
    'acceptTermsOfUse'
  ]
};

function createValidator() {
  const validator = ajv.compile(schema);

  return (model) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const schemaValidator = createValidator(schema);
const individualBridge = new JSONSchemaBridge(schema, schemaValidator);

const individualTypes = [
  {
    label: 'Starter',
    value: 'starter',
    color: '#bae7ff',
    extra: 'I want to learn more but not sure about my commitment at this point'
  }, {
    label: 'Explorer',
    value: 'explorer',
    color: '#85a5ff',
    extra: 'I would like to have some hands-on experience, at least a few hours in a quarter'
  }, {
    label: 'Adventurer',
    value: 'adventurer',
    color: '#722ed1',
    extra: 'I can help with ad-hoc projects, at least a few hours a month'
  }, {
    label: 'Guide',
    value: 'guide',
    color: '#780650',
    extra: 'This is important to me and I am ready to dive in and commit at least a few hours a weeks'
  }
];

const individualTypesColorsMap = Object.fromEntries(
  individualTypes.map((it) => [it.value, it.color])
);

const individualTypesLabelMap = Object.fromEntries(
  individualTypes.map((it) => [it.value, it.label])
);

export {
  individualBridge,
  individualTypes,
  individualTypesColorsMap,
  individualTypesLabelMap
};
