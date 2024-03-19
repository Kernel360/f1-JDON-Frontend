import SkeletonLoader from 'components/common/skeleton/company-card/SkeletonLoader';

function SkeletonCompanySection() {
  return (
    <>
      <SkeletonLoader count={6} />
    </>
  );
}
export default SkeletonCompanySection;
