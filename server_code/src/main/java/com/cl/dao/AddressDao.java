package com.cl.dao;

import com.cl.entity.AddressEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.AddressView;


/**
 * 地址
 * 
 * @author 
 * @email 
 * @date 2026-03-12 19:47:42
 */
public interface AddressDao extends BaseMapper<AddressEntity> {
	
	List<AddressView> selectListView(@Param("ew") Wrapper<AddressEntity> wrapper);

	List<AddressView> selectListView(Pagination page,@Param("ew") Wrapper<AddressEntity> wrapper);
	
	AddressView selectView(@Param("ew") Wrapper<AddressEntity> wrapper);


}
