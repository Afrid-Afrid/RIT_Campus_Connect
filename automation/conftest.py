import pytest
from utils.driver_factory import get_driver

@pytest.fixture
def driver():
    drv = get_driver()
    drv.maximize_window()
    yield drv
    drv.quit()
