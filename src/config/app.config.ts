interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['HR Staff'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Recruitment Manager', 'HR Staff'],
  tenantName: 'Employer',
  applicationName: 'Recruitment Application',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Invite Business Owner and Recruitment Manager to the application',
    'Manage job postings',
    'Schedule interview for candidates',
    'Manage candidate profiles',
  ],
};
