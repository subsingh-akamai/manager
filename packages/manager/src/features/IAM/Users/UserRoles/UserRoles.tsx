import { Button, Paper, Stack, Typography } from '@linode/ui';
import { isEmpty } from 'ramda';
import React from 'react';
import { useParams } from 'react-router-dom';

import { DocumentTitleSegment } from 'src/components/DocumentTitle';

import { NO_ASSIGNED_ROLES_TEXT } from '../../Shared/constants';
import { Entities } from '../../Shared/Entities/Entities';
import { NoAssignedRoles } from '../../Shared/NoAssignedRoles/NoAssignedRoles';

import type { IamUserPermissions } from '@linode/api-v4';

interface Props {
  assignedRoles?: IamUserPermissions;
}

export const UserRoles = ({ assignedRoles }: Props) => {
  const { username } = useParams<{ username: string }>();

  const handleClick = () => {
    // mock for UIE-8140: RBAC-4: User Roles - Assign New Role
  };

  const hasAssignedRoles = assignedRoles ? !isEmpty(assignedRoles) : false;

  return (
    <>
      <DocumentTitleSegment segment={`${username} - User Roles`} />
      <Paper>
        <Stack spacing={3}>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="h2">Assigned Roles</Typography>
            <Button buttonType="primary" onClick={handleClick}>
              Assign New Role
            </Button>
          </Stack>
          {hasAssignedRoles ? (
            <div>
              <p>UIE-8138 - assigned roles table</p>
              {/* just for showing the Entities componnet, it will be gone wuth the AssignedPermissions component*/}

              <Entities access="account_access" type="account" />
              <Entities access="account_access" type="firewall" />
              <Entities access="resource_access" type="linode" />
            </div>
          ) : (
            <NoAssignedRoles text={NO_ASSIGNED_ROLES_TEXT} />
          )}
        </Stack>
      </Paper>
    </>
  );
};
