package org.iproduct.polling.entity;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Alternative.class)
public abstract class Alternative_ {

	public static volatile ListAttribute<Alternative, Vote> votes;
	public static volatile SingularAttribute<Alternative, Long> id;
	public static volatile SingularAttribute<Alternative, String> text;
	public static volatile SingularAttribute<Alternative, Integer> position;
	public static volatile SingularAttribute<Alternative, Poll> poll;

}

