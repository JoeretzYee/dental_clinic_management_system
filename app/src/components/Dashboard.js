import React from "react";

function Dashboard() {
  return (
    <div>
      <div class="row g-4">
        <div class="col-md">
          <div class="card bg-dark text-light">
            <div class="card-body text-center">
              <div class="h1 mb-3">
                <i class="bi bi-laptop"></i>
              </div>
              <h3 class="card-title mb-3">Patients</h3>
              <p class="card-text">3</p>
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="card bg-secondary text-light">
            <div class="card-body text-center">
              <div class="h1 mb-3">
                <i class="bi bi-person-square"></i>
              </div>
              <h3 class="card-title mb-3">Appointments</h3>
              <p class="card-text">3</p>
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="card bg-dark text-light">
            <div class="card-body text-center">
              <div class="h1 mb-3">
                <i class="bi bi-people"></i>
              </div>
              <h3 class="card-title mb-3">Treatments</h3>
              <p class="card-text">10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
