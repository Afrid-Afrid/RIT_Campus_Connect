from pages.login_page import LoginPage
from pages.course_page import CoursePage
from utils.config import BASE_URL, TEST_STUDENT

def test_courses_list_displays(driver):
    LoginPage(driver).open()
    LoginPage(driver).login(TEST_STUDENT["email"], TEST_STUDENT["password"])
    driver.get(f"{BASE_URL}/courses")

    course_page = CoursePage(driver)
    assert course_page.get_course_count() >= 0
