from locust import HttpUser, TaskSet, task, between

class UserBehavior(TaskSet):

    @task(1)
    def load_home_page(self):
        self.client.get("/")


class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(5, 15)

if __name__ == "__main__":
    import os
    os.system("locust -f locustfile.py")
