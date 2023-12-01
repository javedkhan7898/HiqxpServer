import Joi from 'joi'
import Regex from '../constants/regex.constant'

class completeRegistrationValidation {
    public completeRegistration = Joi.object({
        createdBy: Joi.string().required(),
        updatedBy: Joi.string().required(),
        legalName: Joi.string().required(),
        doingBusinessAs: Joi.string().required(),
        taxId: Joi.string().required(),
        officePhone: Joi.string().required(),
        fax: Joi.string().allow(''),
        mailingAddressLine1: Joi.string().required(),
        mailingAddressLine2: Joi.string().allow(''),
        mailingAddressCity: Joi.string().required(),
        mailingAddressStateCode: Joi.string().required(),
        mailingAddressStateName: Joi.string().required(),
        mailingAddressCountry: Joi.string().required(),
        mailingAddressZipCode: Joi.string().required(),
        contactFirstName: Joi.string().required(),
        contactLastName: Joi.string().required(),
        contactEmail: Joi.string().email().required(),
        contactMobileNumber: Joi.string().required(),
        contactOfficePhone: Joi.string().required(),
        accreditation: Joi.string().required(),
        agencyAdminEmail: Joi.string().email().required(),
        agencyAdminFirstName: Joi.string().required(),
        agencyAdminLastName: Joi.string().required(),
        agencyAdminMobile: Joi.string().required(),
        agencyOperationalStatus: Joi.number().integer().required(),
        agencySubmissionStatus: Joi.number().integer().required(),
        billingAddressCity: Joi.string().required(),
        billingAddressLine1: Joi.string().required(),
        billingAddressLine2: Joi.string().allow(''),
        billingAddressStateName: Joi.string().required(),
        billingAddressZipCode: Joi.string().required(),
        companyType: Joi.string().required(),
        email: Joi.string().email().required(),
        medicareProviderNo: Joi.string().required(),
        npi: Joi.string().required(),
        stateHhaLicenseNo: Joi.string().required(),
        submitterId: Joi.string().required(),
        subscriptionPlanId: Joi.string().required(),
        agencyShortCode: Joi.string().required(),
        billingAddressAreaCode: Joi.string().required(),
        hiqAdminComment: Joi.string().allow(''),
        comments: Joi.string().allow(''),
        baaEnvelopeId: Joi.string().required(),
        baaEnvelopeSentDate: Joi.string().required(),
        baaEnvelopeStatus: Joi.string().required(),
        discountId: Joi.string().required(),
        websiteInfo: Joi.string().allow(''),
        demoRequestId: Joi.string().required(),
        contactPerson1Branch: Joi.string().allow(''),
        contactPerson1Email: Joi.string().email().allow(''),
        contactPerson1Name: Joi.string().allow(''),
        contactPerson1Phone: Joi.string().allow(''),
        contactPerson1Title: Joi.string().allow(''),
        contactPerson2Branch: Joi.string().allow(''),
        contactPerson2Email: Joi.string().email().allow(''),
        contactPerson2Name: Joi.string().allow(''),
        contactPerson2Phone: Joi.string().allow(''),
        contactPerson2Title: Joi.string().allow(''),
        contactPerson3Branch: Joi.string().allow(''),
        contactPerson3Email: Joi.string().email().allow(''),
        contactPerson3Name: Joi.string().allow(''),
        contactPerson3Phone: Joi.string().allow(''),
        contactPerson3Title: Joi.string().allow(''),
    })

    public validateCreatedBy(createdBy: string): boolean {
        return Regex.CREATEDBY.test(createdBy)
      }

    public validateUpdatedBy(updatedBy: string): boolean {
        return Regex.CREATEDBY.test(updatedBy)
      }

    public validateLegalName(legalName: string): boolean {
        return Regex.LEGALNAME.test(legalName)
      }
    
    public validateTaxId(taxId: string): boolean {
        return Regex.TAXID.test(taxId)
      }  

    public validateOfficePhone(officePhone: string): boolean {
        return Regex.OFFICEPHONE.test(officePhone)
      }
      
    public validateFax(fax: string): boolean {
        return Regex.OFFICEPHONE.test(fax)
      } 

    public validateMailingAddressStateCode(mailingAddressStateCode: string): boolean {
        return Regex.STATECODE.test(mailingAddressStateCode)
      } 

    public validateMailingAddressStateName(mailingAddressStateName: string): boolean {
        return Regex.STATE.test(mailingAddressStateName)
      }
      
    public validateMailingAddressZipCode(mailingAddressZipCode: string): boolean {
        return Regex.POSTALCODE.test(mailingAddressZipCode)
      }
      
    public validateContactEmail(contactEmail: string): boolean {
        return Regex.EMAIL.test(contactEmail)
      }

    public validateContactMobileNumber(contactMobileNumber: string): boolean {
        return Regex.PHONE.test(contactMobileNumber)
      }

    public validateAgencyAdminEmail(agencyAdminEmail: string): boolean {
        return Regex.EMAIL.test(agencyAdminEmail)
      }

    public validateAgencyAdminMobile(agencyAdminMobile: string): boolean {
        return Regex.PHONE.test(agencyAdminMobile)
      }

    public validateBillingAddressZipCode(billingAddressZipCode: string): boolean {
        return Regex.POSTALCODE.test(billingAddressZipCode)
      }

    public validateEmail(email: string): boolean {
        return Regex.EMAIL.test(email)
      }

    public validateStateHhaLicenseNo(stateHhaLicenseNo: string): boolean {
        return Regex.LICENSENO.test(stateHhaLicenseNo)
      }

    public validateAgencyShortCode(agencyShortCode: string): boolean {
        return Regex.SHORTCODE.test(agencyShortCode)
      }

    public validateBillingAddressAreaCode(billingAddressAreaCode: string): boolean {
        return Regex.POSTALCODE.test(billingAddressAreaCode)
      }

    public validateBaaEnvelopeId(baaEnvelopeId: string): boolean {
        return Regex.ENVELOPEID.test(baaEnvelopeId)
      }

    public validateDiscountId(discountId: string): boolean {
        return Regex.DISCOUNTID.test(discountId)
      }

    public validateDemoRequestId(demoRequestId: string): boolean {
        return Regex.DISCOUNTID.test(demoRequestId)
      }
}

export default completeRegistrationValidation