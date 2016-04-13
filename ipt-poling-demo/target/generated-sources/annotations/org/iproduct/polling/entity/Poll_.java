package org.iproduct.polling.entity;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Poll.class)
public abstract class Poll_ {

	public static volatile SingularAttribute<Poll, String> question;
	public static volatile SingularAttribute<Poll, Date> start;
	public static volatile ListAttribute<Poll, Alternative> alternatives;
	public static volatile SingularAttribute<Poll, Date> end;
	public static volatile SingularAttribute<Poll, Long> id;
	public static volatile SingularAttribute<Poll, String> title;
	public static volatile SingularAttribute<Poll, PollStatus> status;

}

