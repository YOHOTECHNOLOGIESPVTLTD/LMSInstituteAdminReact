import { useState } from 'react';
import Card from '@mui/material/Card';
import MuiCardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import SubscriptionDataTable from 'features/payment-management/subscriptions/components/SubscriptionDataTable';
import SubscriptionHeader from 'features/payment-management/subscriptions/components/SubscriptionHeader';
import SubscriptionPlans from 'features/payment-management/subscriptions/components/SubscriptionPlans';
import { selectSubscriptions } from 'features/payment-management/subscriptions/redux/selectors';
import { getSubscriptions } from 'features/payment-management/subscriptions/redux/thunks';
import { getAllSubscriptionPlans } from 'features/payment-management/subscriptions/services';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

const CardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: `${theme.spacing(2, 2)} !important`,
  [theme.breakpoints.down('xl')]: {
    padding: `${theme.spacing(2)} !important`
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(2, 5)} !important`
  }
}));

const data = {
  pricingPlans: [
    {
      imgWidth: 140,
      imgHeight: 140,
      title: 'Basic',
      monthlyPrice: 0,
      currentPlan: true,
      popularPlan: false,
      subtitle: 'A simple start for everyone',
      imgSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-CGlChBtj__Xxdz5x1MhpgJTIBMKwvaMqtfk1dlvRYGp2qMTuFX7qEd4577tQp_Bc_4A&usqp=CAU',
      yearlyPlan: {
        perMonth: 0,
        totalAnnual: 0
      },
      planBenefits: [
        '100 responses a month',
        'Unlimited forms and surveys',
        'Unlimited fields',
        'Basic form creation tools',
        'Up to 2 subdomains'
      ]
    },
    {
      imgWidth: 140,
      imgHeight: 140,
      monthlyPrice: 49,
      title: 'Standard',
      popularPlan: true,
      currentPlan: false,
      subtitle: 'For small to medium businesses',
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLJmhE49u6xWntXFpVGbT-dX6gO54l1JCvyA&usqp=CAU',
      yearlyPlan: {
        perMonth: 40,
        totalAnnual: 480
      },
      planBenefits: [
        'Unlimited responses',
        'Unlimited forms and surveys',
        'Instagram profile page',
        'Google Docs integration',
        'Custom “Thank you” page'
      ]
    },
    {
      imgWidth: 140,
      imgHeight: 140,
      monthlyPrice: 99,
      popularPlan: false,
      currentPlan: false,
      title: 'Enterprise',
      subtitle: 'Solution for big organizations',
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH_8LezXBeE0Vfp1p51nEPwPtzHuhul8meqw&usqp=CAU',
      yearlyPlan: {
        perMonth: 80,
        totalAnnual: 960
      },
      planBenefits: ['PayPal payments', 'Logic Jumps', 'File upload with 5GB storage', 'Custom domain support', 'Stripe integration']
    }
  ],

  pricingTable: {
    header: [
      {
        title: 'Features',
        subtitle: 'Native Front Features'
      },
      {
        title: 'Starter',
        subtitle: 'Free'
      },
      {
        isPro: true,
        title: 'Pro',
        subtitle: '$7.5/month'
      },
      {
        title: 'Enterprise',
        subtitle: '$16/month'
      }
    ],
    rows: [
      {
        pro: true,
        starter: true,
        enterprise: true,
        feature: '14-days free trial'
      },
      {
        pro: false,
        starter: false,
        enterprise: true,
        feature: 'No user limit'
      },
      {
        pro: true,
        starter: false,
        enterprise: true,
        feature: 'Product Support'
      },
      {
        starter: false,
        enterprise: true,
        pro: 'Add-On Available',
        feature: 'Email Support'
      },
      {
        pro: true,
        starter: false,
        enterprise: true,
        feature: 'Integrations'
      },
      {
        starter: false,
        enterprise: true,
        pro: 'Add-On Available',
        feature: 'Removal of Front branding'
      },
      {
        pro: false,
        starter: false,
        enterprise: true,
        feature: 'Active maintenance & support'
      },
      {
        pro: false,
        starter: false,
        enterprise: true,
        feature: 'Data storage for 365 days'
      }
    ]
  }
};

const Subscription = () => {
  const [refetch, setRefetch] = useState(false);
  const dispatch = useDispatch();
  const Subscription = useSelector(selectSubscriptions);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriptions = await getAllSubscriptionPlans();
        setSubscriptions(subscriptions?.data?.data);
      } catch (error) {
        console.error('Error fetching subscription plans:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(
      getSubscriptions({
        branch_id: selectedBranchId
      })
    );
  }, [dispatch, selectedBranchId, refetch]);

  console.log(setRefetch);
  console.log(Subscription);

  console.log(subscriptions);

  return (
    <Card>
      <CardContent>
        <SubscriptionHeader />
        <SubscriptionDataTable Subscription={Subscription} />
        <SubscriptionPlans data={data.pricingTable} Subscriptions={subscriptions} />

        <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination count={10} color="primary" />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Subscription;
