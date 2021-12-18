import React from 'react';
import { connect } from 'dva';

function AttendancePage() {
  return (
    <div>
      <h1 >Yay! Welcome to AttendancePage!</h1>
    </div>
  );
}

export default connect()(AttendancePage);
