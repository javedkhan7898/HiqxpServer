import Joi from 'joi';

class RoleDepartmentValidation {
    public roleDepartment = Joi.object({
        // userTypeName: Joi.string(),
        id: Joi.string(),
        createdBy: Joi.string(),
        updatedBy: Joi.string(),
        // roleId: Joi.string(),
    });
}
export default RoleDepartmentValidation;