import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getManager } from 'typeorm';

@ValidatorConstraint({ async: true })
export class ExistsOnDatabaseConstraint
  implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    const entity = args.object[`class_entity_${args.property}`];
    if (Number.isNaN(+value)) {
      return false;
    }
    return getManager()
      .findOne(entity, { ['id']: value })
      .then((resp) => {
        if (resp) {
          if (resp['status']) {
            if (resp['status'] === 'ACTIVE') {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        } else {
          return false;
        }
      });
    // .count(entity, { ['id']: value })
    // .then((count) => count > 0);
  }
}

export function ExistsOnDatabase(
  entity: Function,
  validationOptions?: ValidationOptions,
) {
  validationOptions = {
    ...{
      message: `The id: $value must be exists in table ${
        entity.toString().split(' ')[1]
      }. Choose another.`,
    },
    ...validationOptions,
  };
  return function (object: Object, propertyName: string) {
    object[`class_entity_${propertyName}`] = entity;
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistsOnDatabaseConstraint,
    });
  };
}
