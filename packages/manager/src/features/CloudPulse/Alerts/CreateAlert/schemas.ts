import { createAlertDefinitionSchema } from '@linode/validation';
import { object, string } from 'yup';

const fieldErrorMessage = 'This field is required.';

const engineOptionValidation = string().when('service_type', {
  is: 'dbaas',
  otherwise: (schema) => schema.notRequired().nullable(),
  then: (schema) => schema.required('Engine type is required.').nullable(),
});

export const CreateAlertDefinitionFormSchema = createAlertDefinitionSchema.concat(
  object({
    engineType: engineOptionValidation,
    region: string().required('Region is required.'),
    serviceType: string().required('Service is required.'),
  })
);

export const notificationChannelSchema = object({
  channel_type: string().required(fieldErrorMessage),
  label: string().required(fieldErrorMessage),
});
