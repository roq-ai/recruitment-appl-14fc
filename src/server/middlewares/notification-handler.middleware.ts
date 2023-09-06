import { getServerSession } from '@roq/nextjs';
import { NextApiRequest } from 'next';
import { NotificationService } from 'server/services/notification.service';
import { convertMethodToOperation, convertRouteToEntityUtil, HttpMethod, generateFilterByPathUtil } from 'server/utils';
import { prisma } from 'server/db';

interface NotificationConfigInterface {
  roles: string[];
  key: string;
  tenantPath: string[];
  userPath: string[];
}

const notificationMapping: Record<string, NotificationConfigInterface> = {
  'job.create': {
    roles: ['business-owner', 'recruitment-manager'],
    key: 'job-post-created',
    tenantPath: ['employer', 'job'],
    userPath: [],
  },
  'job.update': {
    roles: ['business-owner', 'hr-staff'],
    key: 'job-post-updated',
    tenantPath: ['employer', 'job'],
    userPath: [],
  },
  'candidate.update': {
    roles: ['business-owner', 'hr-staff'],
    key: 'candidate-selected',
    tenantPath: ['employer', 'job', 'candidate'],
    userPath: [],
  },
  'interview.create': {
    roles: ['business-owner', 'recruitment-manager'],
    key: 'interview-scheduled',
    tenantPath: ['employer', 'job', 'candidate', 'interview'],
    userPath: [],
  },
  'interview.update': {
    roles: ['business-owner', 'hr-staff'],
    key: 'interview-updated',
    tenantPath: ['employer', 'job', 'candidate', 'interview'],
    userPath: [],
  },
  'candidate.delete': {
    roles: ['business-owner', 'recruitment-manager'],
    key: 'candidate-deleted',
    tenantPath: ['employer', 'job', 'candidate'],
    userPath: [],
  },
};

const ownerRoles: string[] = ['hr-staff'];
const customerRoles: string[] = [];
const tenantRoles: string[] = ['business-owner', 'recruitment-manager', 'hr-staff'];

const allTenantRoles = tenantRoles.concat(ownerRoles);
export async function notificationHandlerMiddleware(req: NextApiRequest, entityId: string) {
  const session = getServerSession(req);
  const { roqUserId } = session;
  // get the entity based on the request url
  let [mainPath] = req.url.split('?');
  mainPath = mainPath.trim().split('/').filter(Boolean)[1];
  const entity = convertRouteToEntityUtil(mainPath);
  // get the operation based on request method
  const operation = convertMethodToOperation(req.method as HttpMethod);
  const notificationConfig = notificationMapping[`${entity}.${operation}`];

  if (!notificationConfig || notificationConfig.roles.length === 0 || !notificationConfig.tenantPath?.length) {
    return;
  }

  const { tenantPath, key, roles, userPath } = notificationConfig;

  const tenant = await prisma.employer.findFirst({
    where: generateFilterByPathUtil(tenantPath, entityId),
  });

  if (!tenant) {
    return;
  }
  const sendToTenant = () => {
    console.log('sending notification to tenant', {
      notificationConfig,
      roqUserId,
      tenant,
    });
    return NotificationService.sendNotificationToRoles(key, roles, roqUserId, tenant.tenant_id);
  };
  const sendToCustomer = async () => {
    if (!userPath.length) {
      return;
    }
    const user = await prisma.user.findFirst({
      where: generateFilterByPathUtil(userPath, entityId),
    });
    console.log('sending notification to user', {
      notificationConfig,
      user,
    });
    await NotificationService.sendNotificationToUser(key, user.roq_user_id);
  };

  if (roles.every((role) => allTenantRoles.includes(role))) {
    // check if only  tenantRoles + ownerRoles
    await sendToTenant();
  } else if (roles.every((role) => customerRoles.includes(role))) {
    // check if only customer role
    await sendToCustomer();
  } else {
    // both company and user receives
    await Promise.all([sendToTenant(), sendToCustomer()]);
  }
}
