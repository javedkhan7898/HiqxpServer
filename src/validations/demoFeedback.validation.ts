import Joi from 'joi';
import Regex from '../constants/regex.constant';

class DemoFeedbackValidation {
    public demoFeedback = Joi.object({
        feedback: Joi.string().max(500).required(),
        notes: Joi.string(),
        demoRequestId: Joi.string(),
    });
}

export default DemoFeedbackValidation;