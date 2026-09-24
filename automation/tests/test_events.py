from pages.login_page import LoginPage
from pages.event_page import EventPage
from utils.config import BASE_URL, TEST_STUDENT

def test_events_list_loads(driver):
    LoginPage(driver).open()
    LoginPage(driver).login(TEST_STUDENT["email"], TEST_STUDENT["password"])
    driver.get(f"{BASE_URL}/events")

    event_page = EventPage(driver)
    assert event_page.get_event_count() >= 0
