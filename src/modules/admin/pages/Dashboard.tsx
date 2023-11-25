import './dashboard.styles.css'

export const Dashboard = () => {
  return (
  <main className="dashboard__content">
    <div className="content-title">
      <h2>Overview</h2><i className="fa fa-angle-right"></i>
      <div className="filter">
        <a className="filter__item"> Dia </a>
        <a className="filter__item"> Mes </a>
        <a className="filter__item"> Año </a>
      </div>
    </div>
    <div className="pill-wrapper">
      <div className="pill">
        <i className="pill__icon fa fa-user"></i>
        <div className="pill__detail"> Ver Detalle </div>
        <div className="pill__content">
          <div className="pill__date"> Hoy </div>
          <div className="pill__title">
            Venta Total
            </div>
          <div className="pill__value">1231</div>        
        </div>
      </div>

      <div className="pill">
        <i className="pill__icon fa fa-user"></i>
        <div className="pill__detail"> Ver Detalle </div>
        <div className="pill__content">
          <div className="pill__date"> Hoy </div>
          <div className="pill__title">
            Visitas Totales
          </div>
          <div className="pill__value">1446</div>        
        </div>
      </div>

      <div className="pill">
        <i className="pill__icon fa fa-user"></i>
        <div className="pill__detail">View Detail</div>
        <div className="pill__content">
          <div className="pill__date"> Hoy </div>
          <div className="pill__title">
          Crecimiento General
          </div>
          <div className="pill__value">65%</div>        
        </div>
      </div>    
    </div>
    <div className="content-title">
      <h2>Secundario</h2><i className="fa fa-angle-right"></i>
    </div>
    <div className="chart">
      <h3> Ventas totales </h3>
      <div className="hotel__image"></div>
    </div>
    <div className="activity-feed">
      <h3> Actividad Reciente </h3>
      <ul className="feed">
        <li className="feed__item user">
          <div className="user__avatar"></div>
          <div className="user__name">Usuario</div>
          <div className="user__message">nuevo comentario</div>
          <div className="user__timestamp">hace 4 minutos</div>
        </li>
        <li className="feed__item user">
          <div className="user__avatar"></div>
          <div className="user__name">Usuario</div>
          <div className="user__message">nuevo comentario</div>
          <div className="user__timestamp">hace 4 minutos</div>
        </li>
        <li className="feed__item user">
          <div className="user__avatar"></div>
          <div className="user__name">Usuario</div>
          <div className="user__message">nuevo comentario</div>
          <div className="user__timestamp">hace 4 minutos</div>
        </li>
        <li className="feed__item user">
          <div className="user__avatar"></div>
          <div className="user__name">Usuario</div>
          <div className="user__message">nuevo comentario</div>
          <div className="user__timestamp">hace 4 minutos</div>
        </li>
        <li className="feed__item user">
          <div className="user__avatar"></div>
          <div className="user__name">Usuario</div>
          <div className="user__message">nuevo comentario</div>
          <div className="user__timestamp">hace 4 minutos</div>
        </li>
        <li className="feed__item user">
          <div className="user__avatar"></div>
          <div className="user__name">Usuario</div>
          <div className="user__message">nuevo comentario</div>
          <div className="user__timestamp">hace 4 minutos</div>
        </li>
        <li className="feed__item user">
          <div className="user__avatar"></div>
          <div className="user__name">Usuario</div>
          <div className="user__message">nuevo comentario</div>
          <div className="user__timestamp">hace 4 minutos</div>
        </li>      
      </ul>
      <div className="activity-feed__button">
        Ver mas
      </div>
    </div>
    <div className="circle-chart flex flex-col gap-12">
      <h3> Trafico Diario </h3>
      <div className="circle-chart__content">
        <div className="circle"></div>
        <div className="legend">
          <div className="legend__item">
            <div className="legend__icon legend__icon--blue">   </div>
            Usuario
          </div>
          <div className="legend__item">
            <div className="legend__icon legend__icon--orange"></div>
            Visitas
          </div>       
        </div>
      </div>
    </div>
    <div className="circle-chart flex flex-col gap-12">
      <h3> Productividad </h3>
      <div className="circle-chart__content">
        <div className="circle"></div>
        <div className="legend">
          <div className="legend__item">
            <div className="legend__icon legend__icon--blue">   </div>
            Seguro
          </div>
          <div className="legend__item">
            <div className="legend__icon legend__icon--orange"></div>
            Moderado
          </div>        
          <div className="legend__item">
            <div className="legend__icon legend__icon--red"></div>
            Peligroso
          </div>        
        </div>
      </div>
    </div>
  </main>
  )
}
