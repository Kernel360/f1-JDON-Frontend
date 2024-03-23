const { Box, Stack } = require('@mui/material');
const { listContainer } = require('components/coffeechats/list-coffeechats/style');
const { default: PaginationComponent } = require('components/common/pagenation/Pagenation');

function CoffeePagenation({ currentPage, setCurrentPage, coffeeData }) {
  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box sx={listContainer}>
      <Stack justifyContent="center" alignItems="center">
        <PaginationComponent
          pageCount={coffeeData?.pageInfo.totalPages}
          currentPage={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </Box>
  );
}

export default CoffeePagenation;
