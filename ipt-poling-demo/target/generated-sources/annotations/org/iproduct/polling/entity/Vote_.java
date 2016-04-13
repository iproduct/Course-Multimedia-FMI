package org.iproduct.polling.entity;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Vote.class)
public abstract class Vote_ {

	public static volatile SingularAttribute<Vote, Date> voteTime;
	public static volatile SingularAttribute<Vote, Alternative> alternative;
	public static volatile SingularAttribute<Vote, Long> id;
	public static volatile SingularAttribute<Vote, String> email;

}

