import React from 'react';
import Coupon from '../../../Form/Coupon';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet';

const AddCoupons = () => {
    return (
        <div>
              <Helmet>
          <title> ProductPioneer | Add Coupons </title>
        </Helmet>
            <SectionTitle heading={'Add Coupons here'}></SectionTitle>
            <Coupon></Coupon>
        </div>
    );
};

export default AddCoupons;